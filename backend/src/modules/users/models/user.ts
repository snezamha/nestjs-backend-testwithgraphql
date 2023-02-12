import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  userId: string;

  @Field()
  mobile: string;

  @Field({ nullable: false })
  isAdmin?: boolean;
}
