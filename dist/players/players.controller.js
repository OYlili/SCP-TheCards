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
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("./players.service");
const library_1 = require("../library");
const create_deck_dto_1 = require("./create_deck.dto");
const user_1 = require("../user");
let PlayersController = class PlayersController {
    playersService;
    constructor(playersService) {
        this.playersService = playersService;
    }
    getLibrary() {
        return library_1.library;
    }
    createDeck(create_deck, player_id) {
        return this.playersService.createDeck(create_deck, player_id);
    }
    decksAction(deck_action, player_id, deck_id) {
        return this.playersService.decksAction(deck_action, player_id, deck_id);
    }
    changeDeck(deck_action, player_id) {
        return this.playersService.changeDeck(deck_action, player_id);
    }
    async deleteDeck(player_id, deck_id) {
        const user = JSON.parse(await user_1.users.get(player_id + ""));
        delete user.decks[deck_id];
        user_1.User.prototype.store.call(user);
    }
    heartbeat() {
        return {};
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Get)(":id/librarynew"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "getLibrary", null);
__decorate([
    (0, common_1.Post)(":id/decks"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deck_dto_1.CreateDeck, String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "createDeck", null);
__decorate([
    (0, common_1.Put)(":player_id/decks/:deck_id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("player_id")),
    __param(2, (0, common_1.Param)("deck_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.Action, String, Number]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "decksAction", null);
__decorate([
    (0, common_1.Put)(":player_id/decks/"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("player_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deck_dto_1.ChangeDeck, String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "changeDeck", null);
__decorate([
    (0, common_1.Delete)(":player_id/decks/:deck_id"),
    __param(0, (0, common_1.Param)("player_id")),
    __param(1, (0, common_1.Param)("deck_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deleteDeck", null);
__decorate([
    (0, common_1.Put)(":id/heartbeat"),
    (0, common_1.Delete)(":id/heartbeat"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "heartbeat", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map