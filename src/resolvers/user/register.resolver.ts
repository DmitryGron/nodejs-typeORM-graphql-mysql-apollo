import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from "../../entity/User"
import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserResponse } from '../../graphql-types/UserResponse';
import { RegisterInput } from '../../graphql-types/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('data') credentials: RegisterInput,
  ): Promise<UserResponse> {
    const { password, email } = credentials;
    const hashedPassword = await bcrypt.hash(password, 12);
    const existingUser = await getRepository(User).findOne({ email });

    if (existingUser) {
      return {
        errors: [
          {
            path: "email",
            message: "already in use"
          }
        ]
      };
    }
    const user = await getRepository(User).create({
      password: hashedPassword,
      ...credentials
    }).save();

    return { user };
  }
}
