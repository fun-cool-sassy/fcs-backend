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
import Location from "./location";

@Entity({ name: "articles" })
class Article implements Serializable, BaseEntity, Location {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  address!: string;

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  contentId!: string;

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
      contentId: this.contentId,
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
