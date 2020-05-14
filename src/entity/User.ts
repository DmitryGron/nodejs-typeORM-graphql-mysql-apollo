import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users', { orderBy: { id: 'ASC' } })
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => ID)
  id: number;

  @Column({ name: "first_name", type: "varchar", length: 50, nullable: true })
  @Field(() => String)
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 50, nullable: true })
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => String)
  @Unique(['email'])
  email: string;

  @Column()
  @Field(() => String)
  password: string;
}
