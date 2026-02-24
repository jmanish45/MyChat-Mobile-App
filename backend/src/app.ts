import express from 'express';
import { clerkMiddleware } from '@clerk/express'

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';
import { errorHandler } from './middleware/errorHandler';


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(clerkMiddleware())

app.get('/health', (req,res) => {
    res.status(200).json({message: 'Server is healthy'});
})

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);


// Global error handling middleware
//it is written here because it will catch any error that occurs in the routes and send a proper response to the client instead of crashing the server  
app.use(errorHandler)



export default app ;

