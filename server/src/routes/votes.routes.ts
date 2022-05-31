
import { NextFunction, Request, Response, Router } from "express";
import { verifyLogin } from "../middleware/middleware__admin";
import { prisma } from "../prisma";
import { CreatedProposal, EditVote } from "../types/proposal";

export const votesRoute = Router()



votesRoute.post("/adminVote", verifyLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            community,
            title,
            description,
            link,
            quantityTokens,
            typeVote,
            options,
            period,
            networkBlockchain,
            individualVote,
            tokenPeopleVote
        } = <CreatedProposal>req.body



        await prisma.baseVote.create({
            data: {
                community,
                title,
                description,
                link,
                quantityTokens,
                typeVote,
                options,
                period,
                networkBlockchain,
                individualVote,
                tokenPeopleVote
            }
        })
        return res.send("Nova votação criada")
    } catch (err) {
        next(err)
    }
})



votesRoute.post('/sendVote', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, tokenPeopleVote } = <EditVote>req.body

        const dadosVote = await prisma.baseVote.findUnique({
            where: { id },
        })

        let newVote = 0;

        if (dadosVote?.individualVote !== undefined && dadosVote?.individualVote !== null) {
            newVote = dadosVote?.individualVote + 1
        }




        let newDadosVote = [""];
        if (dadosVote?.tokenPeopleVote !== undefined && dadosVote?.tokenPeopleVote !== null) {
            newDadosVote = dadosVote?.tokenPeopleVote

            if (newDadosVote.length === 0) {
                newDadosVote.push(tokenPeopleVote)
            } else {
                if (!newDadosVote.includes(tokenPeopleVote)) {
                    newDadosVote.push(tokenPeopleVote)
                }
            }
        }

        await prisma.baseVote.update({
            where: { id },
            data: {
                individualVote: newVote,
                tokenPeopleVote: newDadosVote
            },
        })

        return res.send("Voto concluído")
    } catch (err) {
        next(err)
    }
})



votesRoute.get("/itensVotes", async (req: Request, res: Response) => {
    const allItens = await prisma.baseVote.findMany()
    return res.send(allItens)
})

