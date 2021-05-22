import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Serializable } from "jsonlike";
import PlainUser from "./plain-user";
import BaseEntity from "./entity";

@Entity({ name: "users" })
class User implements Serializable, BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(user: { username: string; password: string }) {
    this.username = user.username;
    this.password = user.password;
  }

  toJSON(): PlainUser {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt?.valueOf(),
      updatedAt: this.updatedAt?.valueOf(),
    };
  }
}

export default User;
