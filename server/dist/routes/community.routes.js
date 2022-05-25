"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityRoute = void 0;
const prisma_1 = require("../prisma");
const express_1 = require("express");
const middleware__admin_1 = require("../middleware/middleware__admin");
exports.communityRoute = (0, express_1.Router)();
exports.communityRoute.post("/createCommunity", middleware__admin_1.verifyLogin, async (req, res, next) => {
    try {
        const { name, photo, twitter, instagram, twitch } = req.body;
        await prisma_1.prisma.community.create({
            data: {
                name,
                photo,
                twitter,
                instagram,
                twitch
            }
        });
        return res.send("Comunidade cadastrada");
    }
    catch (err) {
        next(err);
    }
    return res.send("Enviado");
});
