import { PlayersService } from './players.service';
import { ChangeDeck, CreateDeck } from './create_deck.dto';
import { Action } from 'src/user';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    getLibrary(): {
        cards: {
            card_type: string;
            count: number;
            gold_card_count: number;
            id: number;
            recently_crafted_count: number;
        }[];
        new_cards: never[];
    };
    createDeck(create_deck: CreateDeck, player_id: string): Promise<import("src/user").Deck>;
    decksAction(deck_action: Action, player_id: string, deck_id: number): Promise<void>;
    changeDeck(deck_action: ChangeDeck, player_id: string): Promise<void>;
    deleteDeck(player_id: string, deck_id: number): Promise<void>;
    heartbeat(): {};
}
