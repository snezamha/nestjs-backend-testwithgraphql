import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
