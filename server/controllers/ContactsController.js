import User from "../models/UserModel.js";
import mongoose from "mongoose";
import Message from "../models/MessagesModel.js";


export async function searchContacts(req, res, next){
    try {
        const {searchTerm} = req.body;
        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).send("searchTerm is required.");
        }
        
        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
              { _id: { $ne: req.userId } },
              {
                $or: [
                  { firstName: regex },
                  { lastName: regex },
                  { email: regex },
                ],
              },
            ],
        });
          
        return res.status(200).json({contacts});

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export const getContactsForDMList = async (request, response, next) => {
  try {
    let { userId } = request;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return response.status(200).json({ contacts });
  } catch (error) {
  console.error("getContactsForDMList error:", error); // this will show the actual issue
  return res.status(500).send("Internal Server Error in getContactsForDMList.");
  }

};

/*export const getAllContacts = async (request, response, next) => {
  try {
    const users = await User.find(
      { _id: { $ne: request.userId } },
      "firstName lastName _id email"
    );

    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      value: user._id,
    }));

    return response.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};*/









export async function searchContactsforChannel(req, res, next){
    try {
        const {searchTerm} = req.query;
        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).send("searchTerm is required.");
        }
        
        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
              { _id: { $ne: req.userId } },
              {
                $or: [
                  { firstName: regex },
                  { lastName: regex },
                  { email: regex },
                ],
              },
            ],
        },  "_id firstName lastName");

        const formattedContacts = contacts.map(user => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`
        }));
        return res.status(200).json({ contacts: formattedContacts });
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
      }
}