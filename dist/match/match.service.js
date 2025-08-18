"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const match_dto_1 = require("./match.dto");
const user_1 = require("../user");
const config_1 = require("../config");
const main_1 = require("../main");
let MatchService = class MatchService {
    static { MatchService_1 = this; }
    static waitingPlayers1 = [];
    static waitingPlayers2 = [];
    static battaleCodePlayers = {};
    static matchedPairs = {};
    async joinMatch(lobbyPlayer) {
        const user = JSON.parse(await user_1.users.get("" + lobbyPlayer.player_id));
        if (user.name == "<anon>") {
            main_1.clients[user.id]?.client.send(JSON.stringify({
                message: "请改名",
                channel: "disconnect",
                context: null,
                timestamp: "",
                sender: "Server",
                receiver: null
            }));
            return;
        }
        if (lobbyPlayer.extra_data.startsWith("battle_code:")) {
            if (!MatchService_1.battaleCodePlayers[lobbyPlayer.extra_data])
                MatchService_1.battaleCodePlayers[lobbyPlayer.extra_data] = [];
            const players = MatchService_1.battaleCodePlayers[lobbyPlayer.extra_data];
            players.push(lobbyPlayer);
            if (players.length >= 2) {
                const match_id = Math.floor(Math.random() * 900000) + 100000;
                const match_info = new match_dto_1.MatchInfo(match_id, players.shift(), players.shift());
                MatchService_1.matchedPairs[match_id] = match_info;
            }
            return true;
        }
        if (!user_1.Deck.prototype.isVaild.call(user.decks[lobbyPlayer.deck_id]))
            return false;
        if (lobbyPlayer.extra_data == "") {
            MatchService_1.waitingPlayers1.push(lobbyPlayer);
            if (MatchService_1.waitingPlayers1.length >= 2) {
                const match_id = Math.floor(Math.random() * 900000) + 100000;
                const match_info = new match_dto_1.MatchInfo(match_id, MatchService_1.waitingPlayers1.shift(), MatchService_1.waitingPlayers1.shift());
                MatchService_1.matchedPairs[match_id] = match_info;
            }
        }
        else {
            MatchService_1.waitingPlayers2.push(lobbyPlayer);
            if (MatchService_1.waitingPlayers2.length >= 2) {
                const match_id = Math.floor(Math.random() * 900000) + 100000;
                const match_info = new match_dto_1.MatchInfo(match_id, MatchService_1.waitingPlayers2.shift(), MatchService_1.waitingPlayers2.shift());
                MatchService_1.matchedPairs[match_id] = match_info;
            }
        }
        return true;
    }
    async checkMatch(player_id) {
        let match = null;
        for (const key in MatchService_1.matchedPairs) {
            if (!MatchService_1.matchedPairs[key].winner_side && MatchService_1.matchedPairs[key].hasPlayer(player_id))
                match = MatchService_1.matchedPairs[key];
        }
        if (match === null)
            return "null";
        return await this.makeMatchStartingInfo(player_id, match);
    }
    async makeMatchStartingInfo(my_id, match) {
        let other;
        if (match.left.player_id == my_id)
            other = match.right;
        else
            other = match.left;
        if (match.matchStartingInfo) {
            match.matchStartingInfo.action_player_id = other.player_id;
            match.matchStartingInfo.action_side = other.player_id == match.left.player_id ? "left" : "right";
            return match.matchStartingInfo;
        }
        const left = JSON.parse(await user_1.users.get("" + match.left.player_id));
        const right = JSON.parse(await user_1.users.get("" + match.right.player_id));
        const left_deck = user_1.Deck.prototype.getCards.call(left.decks[match.left.deck_id], 1, true);
        const right_deck = user_1.Deck.prototype.getCards.call(right.decks[match.right.deck_id], 41, false);
        match.left_deck = left_deck.cards;
        match.right_deck = right_deck.cards;
        match.left_hand = left_deck.cards.splice(0, 4);
        match.right_hand = right_deck.cards.splice(0, 5);
        match.left_hand.forEach((c) => c.location = "hand_left");
        match.right_hand.forEach((c) => c.location = "hand_right");
        match.matchStartingInfo = {
            "local_subactions": true,
            "match_and_starting_data": {
                "match": {
                    "action_player_id": other.player_id,
                    "action_side": other.player_id == match.left.player_id ? "left" : "right",
                    "actions": [],
                    "actions_url": config_1.server_address + "/matches/v2/" + match.match_id + "/actions",
                    "current_action_id": 0,
                    "current_turn": 1,
                    "deck_id_left": match.left.deck_id,
                    "deck_id_right": match.right.deck_id,
                    "left_is_online": 1,
                    "match_id": match.match_id,
                    "match_type": "battle",
                    "match_url": config_1.server_address + "/matches/v2/" + match.match_id,
                    "modify_date": JSON.stringify(new Date()),
                    "notifications": [],
                    "player_id_left": left.id,
                    "player_id_right": right.id,
                    "player_status_left": "not_done",
                    "player_status_right": "not_done",
                    "right_is_online": 1,
                    "start_side": "left",
                    "status": "pending",
                    "winner_id": 0,
                    "winner_side": ""
                },
                "starting_data": {
                    "ally_faction_left": left.decks[match.left.deck_id].ally_faction.toLowerCase(),
                    "ally_faction_right": right.decks[match.right.deck_id].ally_faction.toLowerCase(),
                    "card_back_left": left.decks[match.left.deck_id].card_back,
                    "card_back_right": right.decks[match.right.deck_id].card_back,
                    "starting_hand_left": match.left_hand,
                    "starting_hand_right": match.right_hand,
                    "deck_left": left_deck.cards,
                    "deck_right": right_deck.cards,
                    "equipment_left": left.equipped_item.map((i) => i.item_id),
                    "equipment_right": right.equipped_item.map((i) => i.item_id),
                    "is_ai_match": false,
                    "left_player_name": left.name,
                    "left_player_officer": false,
                    "left_player_tag": left.tag,
                    "location_card_left": left_deck.location,
                    "location_card_right": right_deck.location,
                    "player_id_left": left.id,
                    "player_id_right": right.id,
                    "player_stars_left": 120,
                    "player_stars_right": 120,
                    "right_player_name": right.name,
                    "right_player_officer": false,
                    "right_player_tag": right.tag
                }
            }
        };
        return match.matchStartingInfo;
    }
    processMatch(match_id, action, player) {
        const match = MatchService_1.matchedPairs[match_id];
        if (config_1.ban_cheat && action.action_type == "XActionCheat") {
            main_1.clients[player.id].client.send(JSON.stringify({
                message: "该账户已被封禁",
                channel: "disconnect",
                context: null,
                timestamp: "",
                sender: "Server",
                receiver: null
            }));
            player.banned = true;
            user_1.User.prototype.store.call(player);
            match.winner_side = player.id == match.left.player_id ? "right" : "left";
            return;
        }
        if (action.action == "lvl-loaded")
            return { "otherPlayerReady": 1 };
        if (action.action == "end-match" && !match.winner_side) {
            match.winner_side = action.value.winner_side;
        }
        if (action.action_type || action.action) {
            if (action.action_id) {
                if (player.id == match.left.player_id && action.action_id >= match.left_minactionid)
                    match.left_minactionid = action.action_id;
                else if (action.action_id >= match.right_minactionid)
                    match.right_minactionid = action.action_id;
            }
            if (match.left.player_id == player.id)
                match.right_actions.push(action);
            else
                match.left_actions.push(action);
        }
        return "OK";
    }
    actions(match_id, player, body) {
        const match = MatchService_1.matchedPairs[match_id];
        const result = {};
        const actions = match.getActionsById(player.id);
        if (actions.length != 0 && actions.findIndex((a) => a.action_id == body.min_action_id || a.action) != -1 && actions.sort((a, b) => a.action_id - b.action_id).every((a, i) => a.action || i == 0 || a.action_id - 1 == actions[i - 1].action_id))
            result.actions = match.getActionsById(player.id).splice(0);
        result.match = {
            player_status_left: match.player_status_left,
            player_status_right: match.player_status_right,
            status: "running"
        };
        result.opponent_polling = true;
        if (match.winner_side) {
            result.match.status = "finished";
            result.actions = [{
                    "action_type": "XActionCheat",
                    "player_id": match.left.player_id == player.id ? match.right.player_id : match.left.player_id,
                    "action_data": {
                        "0": "DamageCard",
                        "1": match.winner_side == "left" ? "41" : "1",
                        "2": "99",
                        "playerID": match.left.player_id == player.id ? match.right.player_id : match.left.player_id
                    },
                    "action_id": match.left.player_id == player.id ? match.right_minactionid + 1 : match.left_minactionid + 1,
                    "local_subactions": 1
                }].concat(result.actions);
            result.match = {
                player_status_left: "mulligan_done",
                player_status_right: "mulligan_done",
                status: "finished"
            };
            if (match.left.player_id == player.id) {
                match.right_minactionid = result.actions[0].action_id;
            }
            else {
                match.left_minactionid = result.actions[0].action_id;
            }
        }
        ;
        return result;
    }
    mulligan(match_id, mulliganCards, player) {
        const match = MatchService_1.matchedPairs[match_id];
        let deck, hand;
        if (match.left.player_id == player.id) {
            deck = match.left_deck;
            hand = match.left_hand;
            match.player_status_left = "mulligan_done";
        }
        else {
            deck = match.right_deck;
            hand = match.right_hand;
            match.player_status_right = "mulligan_done";
        }
        const result = { deck, replacement_cards: [] };
        for (const id of mulliganCards.discarded_card_ids) {
            hand.forEach((card) => {
                if (card.card_id == id) {
                    const random_index = Math.floor(Math.random() * result.deck.length);
                    [result.deck[random_index].location, card.location] = [card.location, result.deck[random_index].location];
                    [result.deck[random_index].location_number, card.location_number] = [card.location_number, result.deck[random_index].location_number];
                    result.replacement_cards.push(result.deck[random_index]);
                    result.deck[random_index] = card;
                }
            });
        }
        if (match.left.player_id == player.id)
            match.mulligan_left = result;
        else
            match.mulligan_right = result;
        return result;
    }
    getMulligan(match_id, location) {
        return MatchService_1.matchedPairs[match_id]["mulligan_" + location] ?? "null";
    }
    post(match_id, user) {
        const match = MatchService_1.matchedPairs[match_id];
        if (match.left.player_id == user.id)
            match.player_status_left = "end_match";
        else
            match.player_status_right = "end_match";
        if (match.player_status_left == "end_match" && match.player_status_right == "end_match")
            delete MatchService_1.matchedPairs[match_id];
        if (match[match.winner_side].player_id == user.id) {
            return {
                faction: user.decks[match.getPlayerById(user.id).deck_id].main_faction,
                winner: true
            };
        }
        else {
            return {
                faction: user.decks[match.getPlayerById(user.id).deck_id].main_faction,
                winner: false
            };
        }
    }
    quit(player) {
        let i = MatchService_1.waitingPlayers1.findIndex((p) => p.player_id == player.player_id);
        if (i != -1)
            MatchService_1.waitingPlayers1.splice(i, 1);
        i = MatchService_1.waitingPlayers2.findIndex((p) => p.player_id == player.player_id);
        if (i != -1)
            MatchService_1.waitingPlayers2.splice(i, 1);
        for (const code in MatchService_1.battaleCodePlayers) {
            i = MatchService_1.battaleCodePlayers[code].findIndex((p) => p.player_id == player.player_id);
            if (i != -1)
                MatchService_1.battaleCodePlayers[code].splice(i, 1);
        }
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = MatchService_1 = __decorate([
    (0, common_1.Injectable)()
], MatchService);
//# sourceMappingURL=match.service.js.map