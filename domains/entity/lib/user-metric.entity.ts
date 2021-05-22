import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import BaseEntity from "./entity";

@Entity({ name: "user_metrics" })
@Index(["userId", "articleCount"])
class UserMetric implements BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  userId!: string;

  @Column()
  articleCount!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export default UserMetric;
