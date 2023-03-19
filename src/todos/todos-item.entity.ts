import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class TodosItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 250,
  })
  description: string;

  @Column({
    type: 'tinyint',
    scale: 1,
    default: '0',
  })
  isCompleted: number;

  @Column({
    default: null,
  })
  deadline: Date;

  @ManyToOne(() => User, (user: User) => user.todos)
  user: User;
}
