import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserRole = 'admin' | 'master_admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'admin',
  })
  role: UserRole;
}