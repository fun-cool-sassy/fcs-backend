import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import BaseEntity from "./entity";

@Entity({ name: "problem_metrics" })
@Index(["problem", "count"])
class ProblemMetric implements BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  problem!: string;

  @Column()
  count!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export default ProblemMetric;
