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


    router.get('/parameters/:id_or_name', handler(async (request) => {
        if (!request.params.id_or_name) {
            return Notification.fail('not found')
        }

        const idOrName = request.params.id_or_name;
        const isName = Number.isNaN(Number(idOrName));
        const where = isName
            ? { name: normalizeName(idOrName) }
            : { id: Number(idOrName) };

        const parameter = await prisma.parameter.findUnique({
            where
        });

        return Notification.success(parameter);
    }))


    router.post('/parameters', handler(async (request) => {
        if (!isValid(request.body)) {
            return Notification.fail('the body is not valid');
        }

        const { name, type, value } = request.body

        const normalizedName = normalizeName(name);

        const parameter = await prisma.parameter.upsert({
            where: {
                name: normalizedName,
                project_name: request.projectKey as string
            },
            create: {
                name: normalizedName,
                type,
                value,
                project_name: request.projectKey as string
            },
            update: {
                name: normalizedName,
                type,
                value
            },
            select: { id: true }
        });

        return Notification.success(parameter.id, 200);
    }))

    router.put('/parameters/:id', handler(async (request) => {
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

    router.delete('/parameters/:id', handler(async (request) => {
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