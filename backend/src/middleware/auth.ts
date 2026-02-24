import type {Request, Response, NextFunction} from 'express';

import { getAuth } from '@clerk/express';

import {User} from '../models/User';

import { requireAuth } from '@clerk/express';   

export type AuthRequest = Request & {
    userId?: string; // Add userId to the request type
}
export const protectRoute = [
    requireAuth(),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const {userId : clerkId} = getAuth(req);
            if(!clerkId) {
                return res.status(401).json({
                    message : "Unauthorized - invalid Error"
                })
            }
            const user = await User.findOne({
                clerkId
            })
            if(!user) {
                return res.status(401).json({
                    message : "User not found - Unauthorized"
                })
            }
            req.userId = user._id.toString();;
            next();
        } catch(err) {
            console.error("Error in protectRoute middleware", err);
            res.status(500).json({
                message : "Server error in authentication"
            })
        }
    }
]
