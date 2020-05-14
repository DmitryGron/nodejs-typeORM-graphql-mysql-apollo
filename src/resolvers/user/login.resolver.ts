import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { Mutation, Resolver, Ctx, Args, Query } from 'type-graphql';
import { User } from '../../entity/User';
import { EmailArgs, LoginArgs } from '../../graphql-types/LoginArgs';
import { MyContext } from '../../graphql-types/MyContext';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class LoginResolver {
  @Query(() => Boolean)
  async userExists(@Args() { email }: EmailArgs): Promise<boolean> {
    const user = await getRepository(User).findOne({
      where: { email },
    });

    return !!user;
  }

  @Mutation(() => User)
  async login(
    @Args() { email, password }: LoginArgs,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const user = await getRepository(User).findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError('Invalid user email');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError('Invalid user password');
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
