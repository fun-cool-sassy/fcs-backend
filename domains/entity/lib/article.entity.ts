import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Serializable } from "jsonlike";
import BaseEntity from "./entity";
import PlainArticle from "./plain-article";

@Entity({ name: "articles" })
class Article implements Serializable, BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  address!: string;

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  targets!: string[];

  @Column()
  problems!: string[];

  @Column()
  detail!: string;

  @Column()
  resolved = false;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  toJSON(): PlainArticle {
    return {
      id: this.id,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      targets: this.targets,
      problems: this.problems,
      detail: this.detail,
      resolved: this.resolved,
      createdAt: this.createdAt?.valueOf(),
      updatedAt: this.updatedAt?.valueOf(),
    };
  }
}

export default Article;
