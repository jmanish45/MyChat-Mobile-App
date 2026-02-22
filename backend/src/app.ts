import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/health', (req,res) => {
    res.status(200).json({message: 'Server is healthy'});
})

app.use("/api/routes/auth", authRoutes);
app.use("/api/routes/user", userRoutes);
app.use("/api/routes/chat", chatRoutes);
app.use("/api/routes/message", messageRoutes);




export default app ;

