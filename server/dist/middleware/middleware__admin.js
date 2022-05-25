"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = void 0;
const prisma_1 = require("../prisma");
async function verifyLogin(req, res, next) {
    const allUsers = await prisma_1.prisma.user.findMany();
    allUsers.forEach(user => {
        console.log(user.user);
        console.log(user.user == req.body.user);
        if (user.user == req.body.user && user.password == req.body.password) {
            next();
        }
        else {
            return res.status(403).send({ error: { status: 403, message: 'Access denied.' } });
        }
    });
}
exports.verifyLogin = verifyLogin;
