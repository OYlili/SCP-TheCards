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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const match_dto_1 = require("./match.dto");
const user_1 = require("../user");
let MatchController = class MatchController {
    matchService;
    constructor(matchService) {
        this.matchService = matchService;
    }
    async joinMatch(lobbyPlayer, req) {
        if (!await this.matchService.joinMatch(lobbyPlayer))
            req.socket.destroy();
        return "OK";
    }
    quitMatch(lobbyPlayer) {
        this.matchService.quit(lobbyPlayer);
        return "{status:200}";
    }
    async checkMatch(auth) {
        const user = JSON.parse(await user_1.users.get(auth.slice(8)));
        return this.matchService.checkMatch(user.id);
    }
    async get(auth, id) {
        return "running";
    }
    async processMatch(auth, id, matchAction) {
        return this.matchService.processMatch(id, matchAction, JSON.parse(await user_1.users.get(auth.slice(8))));
    }
    async actions(auth, id, body) {
        return this.matchService.actions(id, JSON.parse(await user_1.users.get(auth.slice(8))), body);
    }
    async sendAction(auth, id, matchAction) {
        return this.matchService.processMatch(id, matchAction, JSON.parse(await user_1.users.get(auth.slice(8))));
    }
    async mulligan(auth, id, mulliganCards) {
        return this.matchService.mulligan(id, mulliganCards, JSON.parse(await user_1.users.get(auth.slice(8))));
    }
    async getMulligan(id, location) {
        return this.matchService.getMulligan(id, location);
    }
    async post(auth, id) {
        return this.matchService.post(id, JSON.parse(await user_1.users.get(auth.slice(8))));
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)("lobbyplayers"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_dto_1.LobbyPlayer, Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "joinMatch", null);
__decorate([
    (0, common_1.Delete)("lobbyplayers"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_dto_1.LobbyPlayer]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "quitMatch", null);
__decorate([
    (0, common_1.Get)("matches/v2"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "checkMatch", null);
__decorate([
    (0, common_1.Get)("matches/v2/:id"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "get", null);
__decorate([
    (0, common_1.Put)("matches/v2/:id"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "processMatch", null);
__decorate([
    (0, common_1.Put)("matches/v2/:id/actions"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "actions", null);
__decorate([
    (0, common_1.Post)("matches/v2/:id/actions"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "sendAction", null);
__decorate([
    (0, common_1.Post)("matches/v2/:id/mulligan"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, match_dto_1.MulliganCards]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "mulligan", null);
__decorate([
    (0, common_1.Get)("matches/v2/:id/mulligan/:location"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("location")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getMulligan", null);
__decorate([
    (0, common_1.Get)("matches/v2/:id/post"),
    __param(0, (0, common_1.Headers)("Authorization")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "post", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map