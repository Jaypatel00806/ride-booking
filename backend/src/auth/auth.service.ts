import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string, role: UserRole) {
    const hash = await bcrypt.hash(password, 10);

    return this.usersService.create(email, hash, role);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Wrong password');

    const token = this.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // ⭐ IMPORTANT CHANGE
    return {
      token,
      role: user.role,
      email: user.email,
    };
  }
}