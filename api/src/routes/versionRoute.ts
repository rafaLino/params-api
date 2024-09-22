import type { Router } from "express";
import { handler } from "../Handler";
import { Notification } from "../Notification";
import prisma from "../prisma";

export default function config(router: Router) {
    router.get('/version', handler(async () => {
        const version = await prisma.version.findFirst({ select: { value: true } });
        if (version)
            return Notification.success(version.value);

        return Notification.fail('version not exist', 400);
    }))

    router.post('/version', handler(async () => {
        const version = await prisma.version.findFirst();
        if (!version) {
            await prisma.version.create({ data: { value: 1 } });
            return Notification.success();
        }

        await prisma.version.update({
            where: { id: version.id },
            data: { value: version.value + 1 }
        })

        return Notification.success();
    }));
} 