import {Router} from 'express';
import {verifyToken} from '../middlewares/AuthMiddleware.js';
import {getMessages} from '../controllers/MessagesController.js';
import multer from 'multer';
import {uploadFile} from '../controllers/MessagesController.js';
import { deleteMessages } from '../controllers/MessagesController.js';

const messagesRoutes = Router();
const upload = multer({dest: "uploads/files" });
messagesRoutes.post('/get-messages', verifyToken, getMessages);
messagesRoutes.post("/upload-file", verifyToken, upload.single("file"), uploadFile);
messagesRoutes.delete("/delete-messages/:messageId", verifyToken, deleteMessages);

export default messagesRoutes;
