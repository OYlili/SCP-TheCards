import { location } from "src/user";
export declare class LobbyPlayer {
    player_id: number;
    deck_id: number;
    extra_data: string;
}
export declare class MatchAction {
    action: string;
    action_type: string;
    action_id: number;
}
export declare class MulliganCards {
    discarded_card_ids: number[];
}
export declare class MatchCard {
    card_id: number;
    is_gold: boolean;
    location: location;
    location_number: number;
    name: string;
}
export declare class MatchInfo {
    constructor(match_id: number, left: LobbyPlayer, right: LobbyPlayer);
    hasPlayer(player_id: number): boolean;
    getPlayerById(player_id: number): LobbyPlayer;
    getActionsById(player_id: number): MatchAction[];
    match_id: number;
    matchStartingInfo: any;
    left: LobbyPlayer;
    right: LobbyPlayer;
    left_actions: MatchAction[];
    right_actions: MatchAction[];
    player_status_left: "not_done" | "mulligan_done" | "end_match";
    player_status_right: "not_done" | "mulligan_done" | "end_match";
    mulligan_left: {
        deck: MatchCard[];
        replacement_cards: MatchCard[];
    };
    mulligan_right: {
        deck: MatchCard[];
        replacement_cards: MatchCard[];
    };
    left_deck: MatchCard[];
    right_deck: MatchCard[];
    left_hand: MatchCard[];
    right_hand: MatchCard[];
    left_minactionid: number;
    right_minactionid: number;
    winner_side: string;
}
