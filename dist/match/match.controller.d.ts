import { MatchService } from './match.service';
import { LobbyPlayer, MulliganCards } from './match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    joinMatch(lobbyPlayer: LobbyPlayer, req: any): Promise<string>;
    quitMatch(lobbyPlayer: LobbyPlayer): string;
    checkMatch(auth: string): Promise<any>;
    get(auth: string, id: number): Promise<string>;
    processMatch(auth: string, id: number, matchAction: any): Promise<"OK" | {
        otherPlayerReady: number;
    } | undefined>;
    actions(auth: string, id: number, body: any): Promise<any>;
    sendAction(auth: string, id: number, matchAction: any): Promise<"OK" | {
        otherPlayerReady: number;
    } | undefined>;
    mulligan(auth: string, id: number, mulliganCards: MulliganCards): Promise<{
        deck: import("./match.dto").MatchCard[];
        replacement_cards: import("./match.dto").MatchCard[];
    }>;
    getMulligan(id: number, location: string): Promise<any>;
    post(auth: string, id: number): Promise<{
        faction: import("src/user").main_faction;
        winner: boolean;
    }>;
}
