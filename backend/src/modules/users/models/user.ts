import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OTP {
  @Field()
  code: number;

  @Field()
  expiresIn: Date;
}

@ObjectType()
export class User {
  @Field()
  userId: string;

  @Field()
  mobile: string;

  @Field({ nullable: false })
  isAdmin?: boolean;

  @Field(() => OTP, { nullable: true })
  otp?: OTP;
}
