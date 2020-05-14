import { IsEmail } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class EmailArgs {
  @Field()
  @IsEmail()
  email: string;
}

@ArgsType()
export class LoginArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
