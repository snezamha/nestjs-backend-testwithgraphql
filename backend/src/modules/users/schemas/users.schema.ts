import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

class Otp {
  @Prop({ required: true, default: '0' })
  code: string;

  @Prop({ required: true, default: '0' })
  expiresIn: Date;
}

@Schema()
export class User {
  @Prop()
  fullName: string;
  @Prop({ required: true })
  mobile: string;
  @Prop({ type: MongooseSchema.Types.Array })
  otp: Otp;
  @Prop({ default: 'false' })
  isAdmin: Boolean;
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
