import type { Router } from "express";
import { handler } from "../Handler";
import { Notification } from "../Notification";
import prisma from "../prisma";

export default function config(router: Router) {
    router.get('/version', handler(async (request) => {
        const version = await prisma.version.findUnique({
            where: { project_name: request.projectKey },
            select: { value: true }
        });
        if (version)
            return Notification.success(version.value);

        return Notification.fail('version not exist', 400);
    }))

    router.post('/version', handler(async (request) => {
        const version = await prisma.version.findUnique({
            where: { project_name: request.projectKey }
        })
        if (!version) {
            await prisma.version.create({ data: { value: 1, project_name: request.projectKey as string } });
            return Notification.success();
        }

        await prisma.version.update({
            where: { id: version.id },
            data: { value: version.value + 1 }
        })

        return Notification.success();
    }));
} 