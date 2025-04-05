import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function AuthMiddleware(req: Request, response: Response, next: NextFunction) {
    const token = req.headers['x-api-key'] as string | null;
    if (!token) {
        return response.status(401)
            .json({
                data: "Bad request"
            });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET ?? '');
        return next();
    } catch {
        // bad token
        return response.status(401)
            .json({
                data: "Internal Server Error"
            });
    }
}
