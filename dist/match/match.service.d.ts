import { LobbyPlayer, MatchAction, MatchCard, MatchInfo, MulliganCards } from './match.dto';
import { User } from 'src/user';
export declare class MatchService {
    static waitingPlayers1: LobbyPlayer[];
    static waitingPlayers2: LobbyPlayer[];
    static battaleCodePlayers: {
        [key: string]: LobbyPlayer[];
    };
    static matchedPairs: {
        [key: string]: MatchInfo;
    };
    joinMatch(lobbyPlayer: LobbyPlayer): Promise<boolean | undefined>;
    checkMatch(player_id: number): Promise<any>;
    makeMatchStartingInfo(my_id: number, match: MatchInfo): Promise<any>;
    processMatch(match_id: number, action: MatchAction, player: User): "OK" | {
        otherPlayerReady: number;
    } | undefined;
    actions(match_id: number, player: User, body: any): any;
    mulligan(match_id: number, mulliganCards: MulliganCards, player: User): {
        deck: MatchCard[];
        replacement_cards: MatchCard[];
    };
    getMulligan(match_id: number, location: string): any;
    post(match_id: number, user: User): {
        faction: import("src/user").main_faction;
        winner: boolean;
    };
    quit(player: LobbyPlayer): void;
}
