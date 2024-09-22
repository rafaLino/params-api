import type { Router } from "express";
import { handler } from "../Handler";
import { Notification } from "../Notification";
import prisma from "../prisma";

export default function config(router: Router) {


    router.get('/parameters', handler(async () => {
        const parameters = await prisma.parameter.findMany();
        return Notification.success(parameters);
    }));


    router.get('/parameter/:id', handler(async (request) => {
        if (!request.params.id) {
            return Notification.fail('not found')
        }

        const parameter = await prisma.parameter.findUnique({ where: { id: Number(request.params.id) } });

        return Notification.success(parameter);
    }))

    router.post('/parameter', handler(async (request) => {
        if (!request.body) {
            return Notification.fail('the body is empty');
        }

        await prisma.parameter.create({ data: request.body });

        return Notification.success(null, 201);
    }))

    router.put('/parameter/:id', handler(async (request) => {
        const errors: Array<string> = [];
        if (!request.body) {
            errors.push('the body is empty');
        }
        if (!request.params.id) {
            errors.push('the id is not found')
        }

        if (errors.length > 0) {
            return Notification.fail(errors);
        }

        await prisma.parameter.update({
            where: {
                id: Number(request.params.id)
            },
            data: request.body
        });

        return Notification.success(null);
    }));

    router.delete('/parameter/:id', handler(async (request) => {
        if (!request.params.id) {
            return Notification.fail('not found')
        }

        await prisma.parameter.delete({ where: { id: Number(request.params.id) } })

        return Notification.success();
    }))
} 