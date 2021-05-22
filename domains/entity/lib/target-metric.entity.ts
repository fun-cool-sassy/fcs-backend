import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import BaseEntity from "./entity";

@Entity({ name: "target_metrics" })
@Index(["target", "count"])
class TargetMetric implements BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  target!: string;

  @Column()
  count!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export default TargetMetric;
