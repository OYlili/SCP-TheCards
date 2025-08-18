import { SessionService } from "./session.service";
import { Session } from "./session.dto";
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    getSession(session: Session, res: any): Promise<any>;
}
