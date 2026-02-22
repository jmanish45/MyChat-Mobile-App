import mongoose from "mongoose";
import dns from "dns";

// Force Node to use Google DNS for MongoDB SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

// With bun no need to import dotenv as it is automatically loaded

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected successfully");
    }
    catch(err) {
        console.log("Mongodb connection error " , err);
        process.exit(1); //exit with failure
    //exit(0) is for success and exit(1) is for failure   

    }
}