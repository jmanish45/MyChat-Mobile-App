import { User } from "../models/User";
import type { AuthRequest } from "../middleware/auth";
import type {NextFunction, Request,  Response } from "express";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express";



export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                message : "User not found"
            })
        }
        res.status(200).json(
            user
        );
    } catch(err) {
        
        res.status(500).json({
            message : "Server error in getMe"
        })
        next(err);
        
    }
}

export async function authCallback(req: Request, res: Response, next: NextFunction) {
    try {
        const {userId: clerkId} = getAuth(req);
        if(!clerkId) {
            return res.status(400).json({
                message : "Invalid authentication callback - no userId"
            })
        }
        let user = await User.findOne({clerkId});
        if(!user) {
            // Create new user
            const clerkUser = await clerkClient.users.getUser(clerkId);
            user = await User.create( {
                clerkId,
                name : clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim(): clerkUser.emailAddresses[0]?.emailAddress.split('@')[0] ,
                email : clerkUser.emailAddresses[0]?.emailAddress,
                avatar : clerkUser.imageUrl,
                
            })
        }
        res.status(200).json({
            user
        })
    } catch(err) {
        console.error("Error in authCallback", err);
        res.status(500);
        next(err);
    }
}