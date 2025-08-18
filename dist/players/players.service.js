"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../user");
let PlayersService = class PlayersService {
    async createDeck(create_deck, player_id) {
        const deck = new user_1.Deck(create_deck, parseInt(player_id));
        const user = JSON.parse(await user_1.users.get(player_id));
        user.decks[deck.id] = deck;
        user_1.User.prototype.store.call(user);
        return deck;
    }
    async decksAction(deck_action, player_id, deck_id) {
        const user = JSON.parse(await user_1.users.get(player_id));
        switch (deck_action.action) {
            case "fill":
                const deck = user.decks[deck_id];
                if (deck) {
                    deck.deck_code = deck_action.deck_code;
                }
                break;
        }
        user_1.User.prototype.store.call(user);
    }
    async changeDeck(action, player_id) {
        const user = JSON.parse(await user_1.users.get(player_id));
        switch (action.action) {
            case "rename":
                user.decks[action.id].name = action.name;
                break;
            case "change_card_back":
                user.decks[action.id].card_back = action.name;
                break;
        }
        user_1.User.prototype.store.call(user);
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)()
], PlayersService);
//# sourceMappingURL=players.service.js.map