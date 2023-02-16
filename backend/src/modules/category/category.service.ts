import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './dtos/input/category.input';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(createCategory: CategoryInput): Promise<Category> {
    const category = new this.categoryModel(createCategory);
    return category.save();
  }

  async findOne(category: FindCategoryInput): Promise<Category> {
    return this.categoryModel.findById(category._id);
  }

  async update(updatecategory: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryModel.findOne(
      new Types.ObjectId(updatecategory._id),
    );
    category.name = updatecategory.name;
    category.updatedAt = new Date();
    return category.save();
  }

  async delete(_id: string): Promise<any> {
    return await this.categoryModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }
}
