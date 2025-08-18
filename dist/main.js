"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const ws_1 = require("ws");
const user_1 = require("./user");
const config_1 = require("./config");
async function bootstrap() {
    const server = express();
    server.disable("etag");
    server.disable("x-powered-by");
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    await app.listen(config_1.port);
}
bootstrap();
const wss = new ws_1.WebSocket.Server({ port: config_1.ws_port });
exports.clients = {};
wss.on("connection", async (ws, req) => {
    const user = JSON.parse(await user_1.users.get(req.headers["authorization"].slice(4)));
    exports.clients[user.id] = { user, client: ws };
    ws.on("message", (m) => {
        const msg = JSON.parse(m.toString());
        switch (msg.channel) {
            case "ping":
                ws.send(JSON.stringify({
                    message: "pong",
                    channel: "ping",
                    context: "",
                    timestamp: new Date(),
                    sender: user.id,
                    receiver: ""
                }));
                break;
            case "touchcard":
                exports.clients[msg.receiver]?.client.send(JSON.stringify({
                    message: msg.message,
                    channel: "touchcard",
                    context: msg.context,
                    timestamp: new Date(),
                    sender: user.id,
                    receiver: msg.receiver
                }));
                break;
            case "emoji":
                exports.clients[msg.receiver]?.client.send(JSON.stringify({
                    message: msg.message,
                    channel: "emoji",
                    context: msg.context,
                    timestamp: new Date(),
                    sender: user.id,
                    receiver: msg.receiver
                }));
                break;
            case "notification":
                if (msg.message == "websocketcheck") {
                    exports.clients[msg.receiver]?.client.send(JSON.stringify({
                        message: "websocketcheck",
                        channel: "notification",
                        context: msg.context,
                        timestamp: new Date(),
                        sender: user.id,
                        receiver: msg.receiver
                    }));
                }
                else if (msg.message == "matchaction") {
                    exports.clients[msg.receiver]?.client.send(JSON.stringify({
                        message: "matchaction",
                        channel: "notification",
                        context: msg.context,
                        timestamp: new Date(),
                        sender: user.id,
                        receiver: msg.receiver
                    }));
                }
                else if (msg.message == "im_here") {
                    exports.clients[msg.receiver]?.client.send(JSON.stringify({
                        message: "im_here",
                        channel: "notification",
                        context: "",
                        timestamp: new Date(),
                        sender: user.id,
                        receiver: msg.receiver
                    }));
                }
                break;
        }
    });
    ws.on("close", () => {
        delete exports.clients[user.id];
    });
});
//# sourceMappingURL=main.js.map