import type { NextFunction, Request, Response } from "express";

declare module 'express' {
    interface Request {
        projectKey?: string
    }
}
export default function ProjectMiddleware(req: Request, response: Response, next: NextFunction) {
    const key = req.headers['x-proj-key'] as string | null;
    if (!key) {
        return response.status(400)
            .json({
                data: "Project key not provided!"
            });
    }
    req.projectKey = key;
    return next();
}