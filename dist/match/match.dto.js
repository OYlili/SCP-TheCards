"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchInfo = exports.MatchCard = exports.MulliganCards = exports.MatchAction = exports.LobbyPlayer = void 0;
class LobbyPlayer {
    player_id;
    deck_id;
    extra_data;
}
exports.LobbyPlayer = LobbyPlayer;
class MatchAction {
    action;
    action_type;
    action_id;
}
exports.MatchAction = MatchAction;
class MulliganCards {
    discarded_card_ids;
}
exports.MulliganCards = MulliganCards;
class MatchCard {
    card_id;
    is_gold;
    location;
    location_number;
    name;
}
exports.MatchCard = MatchCard;
class MatchInfo {
    constructor(match_id, left, right) {
        this.match_id = match_id;
        this.left = left;
        this.right = right;
        this.left_actions = [];
        this.right_actions = [];
        this.player_status_left = "not_done";
        this.player_status_right = "not_done";
        this.left_minactionid = 0;
        this.right_minactionid = 0;
    }
    hasPlayer(player_id) {
        return this.left.player_id == player_id || this.right.player_id == player_id;
    }
    getPlayerById(player_id) {
        return this.left.player_id == player_id ? this.left : this.right;
    }
    getActionsById(player_id) {
        return this.left.player_id == player_id ? this.left_actions : this.right_actions;
    }
    match_id;
    matchStartingInfo;
    left;
    right;
    left_actions;
    right_actions;
    player_status_left;
    player_status_right;
    mulligan_left;
    mulligan_right;
    left_deck;
    right_deck;
    left_hand;
    right_hand;
    left_minactionid;
    right_minactionid;
    winner_side;
}
exports.MatchInfo = MatchInfo;
//# sourceMappingURL=match.dto.js.map