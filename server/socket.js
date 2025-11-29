import {Server as SocketIOServer} from "socket.io";
import Message from "./models/MessagesModel.js";
import Channel from "./models/ChannelModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
      cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
          if (socketId === socket.id) {
            userSocketMap.delete(userId);
            break;
          }
        }
    };

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage =  await Message.create(message);
        const messageData = await Message.findById(createdMessage._id).populate("sender", "id email firstName lastName image color").populate("recipient", "id emnail firstName lastName image color");

        if(recipientSocketId) {
            io.to(recipientSocketId).emit("receiveMessage", messageData);
        }
        if(senderSocketId) {
            io.to(senderSocketId).emit("receiveMessage", messageData);
        }
    };
    
   const sendChannelMessage = async (message) => {
      const { channelId, sender, content, messageType, fileUrl } = message;

      const createdMessage = await Message.create({
        sender,
        recipient: null,
        content,
        messageType,
        timestamp: new Date(),
        fileUrl,
      });

      const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .exec();

      await Channel.findByIdAndUpdate(channelId, {
        $push: { messages: createdMessage._id },
      });

      const channel = await Channel.findById(channelId).populate("members");

      const finalData = { ...messageData._doc, channelId: channel._id };

      if (channel && channel.members) {
        channel.members.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("recieve-channel-message", finalData);
          }
        });
        const adminSocketId = userSocketMap.get(channel.admin._id.toString());
          if (adminSocketId) {
            io.to(adminSocketId).emit("recieve-channel-message", finalData);
          }
      }
    };


    io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;
      if (userId) {
        userSocketMap.set(userId, socket.id);
        console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
      } else {
        console.log("User ID not provided during connection.");
      }
      socket.on("sendMessage", sendMessage);
      socket.on("send-channel-message", sendChannelMessage);
      socket.on("disconnect", () => disconnect(socket));

      socket.on("message-deleted", async ({ messageId, chatId }) => {

  try {
    const message = await Message.findById(messageId)
      .populate("sender", "_id")
      .populate("recipient", "_id");

    if (!message) {
      console.log("Message not found.");
      return;
    }

    const senderId = message.sender._id.toString();
    const recipientId = message.recipient._id.toString();

    const senderSocketId = userSocketMap.get(senderId);
    const recipientSocketId = userSocketMap.get(recipientId);

    const payload = { messageId, message };

    if (senderSocketId) io.to(senderSocketId).emit("message-deleted", payload);
    if (recipientSocketId) io.to(recipientSocketId).emit("message-deleted", payload);
    console.log("Message deleted event received:", messageId, chatId);

  } catch (err) {
    console.error("Error handling message-deleted event:", err);
  }
});
    });
};
    
      
export default setupSocket;

