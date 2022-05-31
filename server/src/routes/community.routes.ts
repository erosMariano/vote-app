import { prisma } from "../prisma";
import { NextFunction, Request, Response, Router } from "express";
import { verifyLogin } from "../middleware/middleware__admin";
import { Community } from "../types/community";

export const communityRoute = Router()

communityRoute.post("/createCommunity", verifyLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, photo, twitter, instagram, twitch } = <Community>req.body

        await prisma.community.create({
            data: {
                name,
                photo,
                twitter,
                instagram,
                twitch
            }
        })
        return res.send("Comunidade cadastrada")
    } catch (err) {
        next(err)
        console.log(err)
    }
})
