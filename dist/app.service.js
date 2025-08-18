"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
const user_1 = require("./user");
const library_1 = require("./library");
let AppService = class AppService {
    async getConfig(auth) {
        const config = {
            "current_user": {},
            "endpoints": {
                "draft": config_1.server_address + "/draft/",
                "email": config_1.server_address + "/email/set",
                "lobbyplayers": config_1.server_address + "/lobbyplayers",
                "matches": config_1.server_address + "/matches",
                "matches2": config_1.server_address + "/matches/v2/",
                "my_draft": "",
                "my_items": "",
                "my_player": "",
                "players": config_1.server_address + "/players",
                "purchase": config_1.server_address + "/store/v2/txn",
                "root": config_1.server_address,
                "session": config_1.server_address + "/session",
                "store": config_1.server_address + "/store/",
                "tourneys": config_1.server_address + "/tourney/",
                "transactions": config_1.server_address + "/store/txn",
                "view_offers": config_1.server_address + "/store/v2/"
            }
        };
        if (auth) {
            const user = JSON.parse(await user_1.users.get(auth.slice(8)));
            config.current_user = {
                "client_id": user.id,
                "exp": user.id,
                "external_id": auth.slice(8),
                "iat": 1752328020,
                "identity_id": user.id,
                "iss": "",
                "jti": "",
                "language": user.locale,
                "payment": "notavailable",
                "player_id": user.id,
                "provider": "device",
                "roles": [],
                "tier": "LIVE",
                "user_id": user.id,
                "user_name": auth.slice(8)
            };
            config.endpoints.my_draft = config_1.server_address + "/draft/" + user.id;
            config.endpoints.my_items = config_1.server_address + "/items/" + user.id;
            config.endpoints.my_player = config_1.server_address + "/players/" + user.id;
        }
        return config;
    }
    getItems(player) {
        if (!player.items)
            player.items = [];
        user_1.User.prototype.store.call(player);
        return { equipped_items: player.equipped_item, items: library_1.items.concat(player.items) };
    }
    equipItem(player, item) {
        if (!player.equipped_item)
            player.equipped_item = [];
        let i = -1;
        while ((i = player.equipped_item.findIndex((i) => i.slot == item.slot)) != -1) {
            player.equipped_item.splice(i, 1);
        }
        ;
        player.equipped_item.push(item);
        user_1.User.prototype.store.call(player);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map