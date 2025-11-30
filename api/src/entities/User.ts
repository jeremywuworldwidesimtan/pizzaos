import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export type UserRole = 'admin' | 'manager' | 'staff';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, unique: true })
  email: string; 

  @Column({ length: 200 })
  password_hash: string;

  @Column({ type: 'varchar', length: 20 })
  role: UserRole; 

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
