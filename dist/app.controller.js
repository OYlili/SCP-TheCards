"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const user_1 = require("./user");
const main_1 = require("./main");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getConfig(auth) {
        return this.appService.getConfig(auth);
    }
    async getItems(auth) {
        return this.appService.getItems(JSON.parse(await user_1.users.get(auth.slice(8))));
    }
    async equipItem(auth, body) {
        this.appService.equipItem(JSON.parse(await user_1.users.get(auth.slice(8))), body);
        return body;
    }
    async setName(body, auth) {
        const user = JSON.parse(await user_1.users.get(auth.slice(8)));
        if (body.friend_tag == 0) {
            user.name = body.friend_name;
            user_1.User.prototype.store.call(user);
        }
        return "OK";
    }
    getOnline() {
        return Object.values(main_1.clients).map(c => c.user);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)("items/:id"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getItems", null);
__decorate([
    (0, common_1.Post)("items/:id"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "equipItem", null);
__decorate([
    (0, common_1.Post)("//players/:player_id/friends"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setName", null);
__decorate([
    (0, common_1.Get)("getonline"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getOnline", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(""),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map