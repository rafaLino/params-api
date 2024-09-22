import { Notification } from "./Notification";
import type { Request, Response } from 'express';

export function handler(action: (request: Request) => Promise<Notification>) {
    return async (req: Request, res: Response) => {
        try {
            const notification = await action(req);

            return res.status(notification.statusCode)
                .json({
                    data: notification.data
                });

        } catch (error: any) {
            return res.status(500).json({
                data: { message: error.message }
            })
        }
    }
}