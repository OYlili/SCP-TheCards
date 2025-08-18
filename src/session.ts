import { users, User } from "./user";

export async function setupSessionRoutes(app) {
  // 如果数据库里没有用户，就造一个
  let user: User;
  try {
    const data = await users.get("test@example.com");
    user = JSON.parse(data);
  } catch (e) {
    user = new User("test@example.com");
    user.name = "TestPlayer";
    user.tag = 1234;
    await users.put(user.user_name, JSON.stringify(user));
    await users.put("" + user.id, JSON.stringify(user));
    console.log("新用户已创建:", user);
  }

  // 提供 /session 接口
  app.get("/session", (req, res) => {
    res.json(user);
  });
}