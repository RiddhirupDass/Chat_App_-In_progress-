import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";


const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef(); 
    const { userInfo } = useAppStore();
    
    useEffect(() => {

        if (userInfo) {
          socket.current = io(HOST, {
            withCredentials: true,
            query: { userId: userInfo.id },
          });
      
          socket.current.on("connect", () => {
            console.log("Connected to socket server");
          });

        

          const handleRecieveMessage = (message) => {
            const { selectedChatData, selectedChatType, addMessage, addContactsInDMContacts } = useAppStore.getState();

            if(selectedChatType!==undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
                console.log("Received message in selected chat", message);
                addMessage(message);
            }
            addContactsInDMContacts(message);
          };

          const handleRecieveChannelMessage = (message) => {
            const { selectedChatData, selectedChatType, addMessage, addChannelInChannelList } = useAppStore.getState();

            if(selectedChatType !== undefined && selectedChatData._id === message.channelId) {
                addMessage(message);
            }
            addChannelInChannelList(message);
          };

          const handleDeleteMessage = (payload) => {
            const { selectedChatData, selectedChatType, deleteMessage } = useAppStore.getState();

            /*// Check if the message exists in the currently selected chat
            const exists = selectedChatMessages.some((msg) => msg._id === messageId);*/

            if(selectedChatType!==undefined && (selectedChatData._id === payload.message.sender._id || selectedChatData._id === payload.message.recipient._id)) {
                console.log("Deleting message from selected chat:", payload.messageId);
                deleteMessage(payload.messageId);
            }
          };


          socket.current.on("receiveMessage", handleRecieveMessage);
          socket.current.on("recieve-channel-message", handleRecieveChannelMessage);
          socket.current.on("message-deleted", handleDeleteMessage);
          return () => {
            socket.current.disconnect();
          };
        }
    }, [userInfo]);
      
    return (
      <SocketContext.Provider value={socket.current}>
          {children}
      </SocketContext.Provider>
    );  
}      


