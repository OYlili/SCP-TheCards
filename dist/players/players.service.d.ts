import { ChangeDeck, CreateDeck } from './create_deck.dto';
import { Action, Deck } from 'src/user';
export declare class PlayersService {
    createDeck(create_deck: CreateDeck, player_id: string): Promise<Deck>;
    decksAction(deck_action: Action, player_id: string, deck_id: number): Promise<void>;
    changeDeck(action: ChangeDeck, player_id: string): Promise<void>;
}
