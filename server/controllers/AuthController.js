import User from "./../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { renameSync, unlinkSync } from "fs";

const age = 2*24*60*60*1000;

function createToken(email, userId){
    const accessToken = jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: age});
    return accessToken;
}
export async function signup(req, res, next){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and password required");
        }
        const user = await User.create({email,password});
        res.cookie("jwt", createToken(email,user.id), {
            maxAge : age,
            secure: true,
            sameSite: "None",
        });
        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export async function login(req, res, next){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and password required");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("User not found!");
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.status(400).send("Incorrect password!");
        }
        res.cookie("jwt", createToken(email,user.id), {
            maxAge : age,
            secure: true,
            sameSite: "None",
        });
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                image: user.image,
                firstName: user.firstName,
                lastName: user.lastName,
                color: user.color,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export async function getUserInfo(req, res, next){
    try {
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(404).send("User with the given ID not found!");
        }
        return res.status(200).json({
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                image: userData.image,
                firstName: userData.firstName,
                lastName: userData.lastName,
                color: userData.color,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export async function updateProfile(req, res, next){
    try {
        const {userId} = req;
        const {firstName, lastName, color} = req.body;

        if(!firstName || !lastName || color === undefined){
            return res.status(400).send("First name, last name and color required!");
        }
        const userData = await User.findByIdAndUpdate(userId, {firstName, lastName, color, profileSetup : true}, {new: true, runValidators: true})
        return res.status(200).json({
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                image: userData.image,
                firstName: userData.firstName,
                lastName: userData.lastName,
                color: userData.color,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export async function addProfileImage(req, res, next){
    try {
        if(!req.file){
            return res.status(400).send("Image required!");
        }
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const updatedUser = await User.findByIdAndUpdate(req.userId, {image: fileName}, {new: true, runValidators: true});

        return res.status(200).json({image: updatedUser.image});
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export async function removeProfileImage(req, res, next){
    try {
        const {userId} = req;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send("User not found!");
        }
        if(user.image){
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        
        return res.status(200).send("Profile image removed successfully!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}

export async function logOut(req, res, next){
    try {
        res.cookie("jwt", "", {
            maxAge: 1,
            secure: true,
            sameSite: "None",
        });
        return res.status(200).send("LogOut Sucessful!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server error");
    }
}
