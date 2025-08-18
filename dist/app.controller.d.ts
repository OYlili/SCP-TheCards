import { AppService } from './app.service';
import { User } from './user';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getConfig(auth: string): object;
    getItems(auth: string): Promise<{
        equipped_items: import("./user").Item[];
        items: {
            cnt: number;
            details: {};
            item_id: string;
        }[];
    }>;
    equipItem(auth: string, body: any): Promise<any>;
    setName(body: any, auth: string): Promise<string>;
    getOnline(): User[];
}
