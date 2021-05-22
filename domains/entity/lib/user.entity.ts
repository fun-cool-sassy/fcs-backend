import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Serializable } from "jsonlike";
import PlainUser from "./plain-user";
import BaseEntity from "./entity";

@Entity({ name: "users" })
@Index(["username"])
class User implements Serializable, BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  static from(plain: { username: string; password: string }): User {
    const user = new User();
    user.username = plain.username;
    user.password = plain.password;

    return user;
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
