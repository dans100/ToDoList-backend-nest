import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodosItem } from '../todos/todos-item.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 55,
  })
  username: string;

  @Column()
  pwdHash: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    length: 256,
    unique: true,
  })
  email: string;

  @OneToMany(() => TodosItem, (todos: TodosItem) => todos.user)
  todos: TodosItem[];
}
