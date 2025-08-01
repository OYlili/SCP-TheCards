import { Injectable } from '@nestjs/common';
import { items, server_address } from "./config";
import { Item, User, users } from './user';

@Injectable()
export class AppService {
  async getConfig(auth: string) {
    const config = {
      "current_user": {},
      "endpoints": {
        "draft": server_address + "/draft/",
        "email": server_address + "/email/set",
        "lobbyplayers": server_address + "/lobbyplayers",
        "matches": server_address + "/matches",
        "matches2": server_address + "/matches/v2/",
        "my_draft": "",
        "my_items": "",
        "my_player": "",
        "players": server_address + "/players",
        "purchase": server_address + "/store/v2/txn",
        "root": server_address,
        "session": server_address + "/session",
        "store": server_address + "/store/",
        "tourneys": server_address + "/tourney/",
        "transactions": server_address + "/store/txn",
        "view_offers": server_address + "/store/v2/"
      }
    };
    if (auth) {
      const user: User = JSON.parse(await users.get(auth.slice(8)));
      config.current_user = {
        "client_id": user.id,
        "exp": user.id,
        "external_id": auth.slice(8),
        "iat": 1752328020,
        "identity_id": user.id,
        "iss": "",
        "jti": "",
        "language": user.locale,
        "payment": "notavailable",
        "player_id": user.id,
        "provider": "device",
        "roles": [],
        "tier": "LIVE",
        "user_id": user.id,
        "user_name": auth.slice(8)
      };
      config.endpoints.my_draft = server_address + "/draft/" + user.id
      config.endpoints.my_items = server_address + "/items/" + user.id
      config.endpoints.my_player = server_address + "/players/" + user.id
    }
    return config;
  }

  getItems(player: User) {
    return { equipped_items: player.equipped_item, items }
  }

  equipItem(player: User, item: Item) {
    if(item.slot != "avatar") return;
    player.equipped_item = [item];
    User.prototype.store.call(player);
  }
}
