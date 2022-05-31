import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";


export async function verifyLogin(req: Request, res: Response, next: NextFunction) {
    const allUsers = await prisma.user.findMany()

    allUsers.forEach(user => {
        console.log(user.user == req.body.user)
        if (user.user == req.body.user && user.password == req.body.password) {
            next()
        } else {
            return res.status(403).send({ error: { status: 403, message: 'Access denied.' } });
        }
    })
}
