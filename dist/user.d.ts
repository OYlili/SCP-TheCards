import { Level } from "level";
import { CreateDeck } from "./players/create_deck.dto";
import { MatchCard } from "./match/match.dto";
export type main_faction = "Germany" | "Britain" | "Soviet" | "USA" | "Japan";
export type ally_faction = main_faction | "France" | "Italy" | "Poland" | "Finland";
export type location = "deck_left" | "deck_right" | "board_hqleft" | "board_hqright" | "hand_left" | "hand_right";
export declare class Deck {
    constructor(deck_action: CreateDeck, player_id: number);
    getCards(start_id: number, is_left: boolean): {
        cards: MatchCard[];
        location: {
            card_id: number;
            faction: string;
            is_gold: boolean;
            location: string;
            location_number: number;
            name: any;
        };
    };
    isVaild(): boolean;
    name: string;
    main_faction: main_faction;
    ally_faction: ally_faction;
    card_back: string;
    deck_code: string;
    favorite: boolean;
    id: number;
    player_id: number;
    last_played: Date;
    create_date: Date;
    modify_date: Date;
}
export declare class Item {
    faction: string;
    item_id: string;
    slot: string;
}
export declare const users: Level<string, string>;
export declare class User {
    constructor(user_name: string);
    store(): Promise<void>;
    id: number;
    user_name: string;
    name: string;
    locale: string;
    tag: number;
    decks: {
        [key: number]: Deck;
    };
    equipped_item: Item[];
    items: any;
    banned: boolean;
}
export declare class Action {
    action: string;
    value: string;
    deck_code: string;
}
