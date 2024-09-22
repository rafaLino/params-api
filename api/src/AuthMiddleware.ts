import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default function AuthMiddleware(req: Request, response: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return response.status(401)
            .json({
                data: "Bad request"
            });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return next();
    } catch {
        // bad token
        return response.status(401)
            .json({
                data: "Internal Server Error"
            });
    }
}
