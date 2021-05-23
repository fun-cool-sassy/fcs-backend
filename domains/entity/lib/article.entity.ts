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
  ownerId!: string;

  @Column()
  address!: string;

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  contentLocation!: string;

  @Column({ type: "simple-array" })
  targets!: string[];

  @Column({ type: "simple-array" })
  problems!: string[];

  @Column({ nullable: true })
  detail?: string;

  @Column({ type: "boolean" })
  resolved = false;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  toJSON(): PlainArticle {
    return {
      id: this.id,
      ownerId: this.ownerId,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      contentLocation: this.contentLocation,
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
