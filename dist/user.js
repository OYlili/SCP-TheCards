"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.User = exports.users = exports.Item = exports.Deck = void 0;
const level_1 = require("level");
const library_1 = require("./library");
class Deck {
    constructor(deck_action, player_id) {
        this.name = deck_action.name;
        this.main_faction = deck_action.main_faction;
        this.ally_faction = deck_action.ally_faction;
        this.card_back = "cardback_starter_" + deck_action.main_faction.toLowerCase();
        this.deck_code = deck_action.deck_code;
        this.favorite = false;
        this.id = Math.floor(Math.random() * 900000) + 100000;
        this.player_id = player_id;
        this.last_played = new Date();
        this.create_date = new Date();
        this.modify_date = new Date();
    }
    getCards(start_id, is_left) {
        const cards_code = this.deck_code.replace(/~[^|]*/g, "").split("|")[1].split(";");
        const cards = [];
        let location = {
            card_id: start_id,
            faction: this.main_faction.toLowerCase(),
            is_gold: true,
            location: is_left ? "board_hqleft" : "board_hqright",
            location_number: 0,
            name: library_1.deckCodeIDsTable[this.deck_code.split("|")[2].slice(0, 2)].card
        };
        for (const i of [0, 1, 2, 3]) {
            cards_code[i].match(/.{1,2}/g)?.forEach((code) => {
                for (let j = 0; j <= i; j++) {
                    cards.push({
                        card_id: ++start_id,
                        is_gold: true,
                        location: is_left ? "deck_left" : "deck_right",
                        location_number: 0,
                        name: library_1.deckCodeIDsTable[code].card
                    });
                }
            });
        }
        for (let i = 0; i < cards.length; i++) {
            const randomIndex = Math.floor(Math.random() * (cards.length - i)) + i;
            [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
        }
        cards.forEach((c, i) => c.location_number = i);
        return {
            cards,
            location
        };
    }
    isVaild() {
        const cards_code = this.deck_code.replace(/~[^|]*/g, "").split("|")[1].split(";");
        const cards = {};
        let result = true;
        for (const i of [0, 1, 2, 3]) {
            cards_code[i].match(/.{1,2}/g)?.forEach((code) => {
                if (!cards[code])
                    cards[code] = i + 1;
                else
                    cards[code] += i + 1;
                if (cards[code] > 4)
                    result = false;
            });
        }
        return result;
    }
    name;
    main_faction;
    ally_faction;
    card_back;
    deck_code;
    favorite;
    id;
    player_id;
    last_played;
    create_date;
    modify_date;
}
exports.Deck = Deck;
class Item {
    faction;
    item_id;
    slot;
}
exports.Item = Item;
exports.users = new level_1.Level("./db/users.db");
class User {
    constructor(user_name) {
        this.id = Math.floor(Math.random() * 900000) + 100000;
        this.user_name = user_name;
        this.name = "<anon>";
        this.tag = Math.floor(Math.random() * 9000) + 1000;
        this.locale = "zh-Hans";
        this.decks = {};
        this.equipped_item = [];
        this.items = [];
        this.banned = false;
    }
    async store() {
        await exports.users.put(this.user_name, JSON.stringify(this));
        await exports.users.put("" + this.id, JSON.stringify(this));
    }
    id;
    user_name;
    name;
    locale;
    tag;
    decks;
    equipped_item;
    items;
    banned;
}
exports.User = User;
class Action {
    action;
    value;
    deck_code;
}
exports.Action = Action;
//# sourceMappingURL=user.js.map