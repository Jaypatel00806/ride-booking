import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(email: string, password: string, role: UserRole = 'admin') {
    const user = this.repo.create({
      email,
      password,
      role,
    });

    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
    });
  }
}