import { Controller, Post, Body } from '@nestjs/common';
import { User, users } from './user';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body('user_name') user_name: string) {
    if (!user_name) {
      return { error: 'user_name is required' };
    }

    // 查一下是否已经存在
    try {
      const existing = await users.get(user_name);
      if (existing) {
        const parsed = JSON.parse(existing);
        return { token: parsed.id, user: parsed };
      }
    } catch {}

    // 创建新用户
    const user = new User(user_name);
    await user.store();
    return { token: user.id, user };
  }

  @Post('login')
  async login(@Body('user_name') user_name: string) {
    if (!user_name) {
      return { error: 'user_name is required' };
    }
    try {
      const existing = await users.get(user_name);
      if (existing) {
        const parsed = JSON.parse(existing);
        return { token: parsed.id, user: parsed };
      }
    } catch {
      return { error: 'User not found' };
    }
  }
}