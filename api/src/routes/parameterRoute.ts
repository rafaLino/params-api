import type { Router } from "express";
import { handler } from "../Handler";
import { Notification } from "../Notification";
import prisma from "../prisma";

export default function config(router: Router) {

    router.get('/parameters', handler(async (request) => {
        const parameters = await prisma.parameter.findMany({
            where: { project_name: request.projectKey }
        });
        return Notification.success(parameters);
    }));


    router.get('/parameter/:id', handler(async (request) => {
        if (!request.params.id) {
            return Notification.fail('not found')
        }

        const parameter = await prisma.parameter.findUnique({
            where: { id: Number(request.params.id) }
        });

        return Notification.success(parameter);
    }))

    router.post('/parameter', handler(async (request) => {
        if (!isValid(request.body)) {
            return Notification.fail('the body is not valid');
        }

        const { name, type, value } = request.body

        const parameter = await prisma.parameter.create({
            data: {
                name: normalizeName(name),
                type,
                value,
                project_name: request.projectKey as string
            },
            select: { id: true }
        });

        return Notification.success(parameter.id, 201);
    }))

    router.put('/parameter/:id', handler(async (request) => {
        const errors: Array<string> = [];
        if (!isValid(request.body)) {
            errors.push('the body is not valid');
        }
        if (!request.params.id) {
            errors.push('the parameter is not found')
        }

        if (errors.length > 0) {
            return Notification.fail(errors);
        }

        const { name, type, value, id } = request.body;

        await prisma.parameter.update({
            where: {
                id: Number(request.params.id)
            },
            data: {
                id,
                type,
                value,
                name: normalizeName(name),
                project_name: request.projectKey
            }
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


function isValid(body: Record<string, unknown>) {
    if (!body)
        return false;

    const { name, type, value } = body;

    return name && type && value;
}

function normalizeName(name: string) {
    return name.trim().toLowerCase();
}