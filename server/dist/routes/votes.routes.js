"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.votesRoute = void 0;
const express_1 = require("express");
const middleware__admin_1 = require("../middleware/middleware__admin");
const prisma_1 = require("../prisma");
exports.votesRoute = (0, express_1.Router)();
exports.votesRoute.post("/adminVote", middleware__admin_1.verifyLogin, async (req, res, next) => {
    try {
        const { community, title, description, link, quantityTokens, typeVote, options, period, networkBlockchain, individualVote, tokenPeopleVote } = req.body;
        await prisma_1.prisma.baseVote.create({
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
        });
        return res.send("Enviado");
    }
    catch (err) {
        next(err);
    }
    return res.send("Enviado");
});
exports.votesRoute.post('/sendVote', async (req, res, next) => {
    try {
        const { id, tokenPeopleVote } = req.body;
        const dadosVote = await prisma_1.prisma.baseVote.findUnique({
            where: { id },
        });
        let newVote = 0;
        if (dadosVote?.individualVote !== undefined && dadosVote?.individualVote !== null) {
            newVote = dadosVote?.individualVote + 1;
        }
        let newDadosVote = [""];
        if (dadosVote?.tokenPeopleVote !== undefined && dadosVote?.tokenPeopleVote !== null) {
            newDadosVote = dadosVote?.tokenPeopleVote;
            if (newDadosVote.length === 0) {
                newDadosVote.push(tokenPeopleVote);
            }
            else {
                if (!newDadosVote.includes(tokenPeopleVote)) {
                    newDadosVote.push(tokenPeopleVote);
                }
            }
        }
        await prisma_1.prisma.baseVote.update({
            where: { id },
            data: {
                individualVote: newVote,
                tokenPeopleVote: newDadosVote
            },
        });
        return res.send("Voto concluído");
    }
    catch (err) {
        next(err);
    }
});
exports.votesRoute.get("/itensVotes", async (req, res) => {
    const allItens = await prisma_1.prisma.baseVote.findMany();
    return res.send(allItens);
});
