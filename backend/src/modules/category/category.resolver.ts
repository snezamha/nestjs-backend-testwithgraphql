import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category.dto';
import {
  CategoryInput,
  FindCategoryInput,
  UpdateCategoryInput,
} from './dtos/input/category.input';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryDto])
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('input') input: CategoryInput) {
    return this.categoryService.create(input);
  }

  @Query(() => [CategoryDto])
  async findCategory(@Args('input') input: FindCategoryInput) {
    return this.categoryService.findOne(input);
  }

  @Mutation(() => CategoryDto)
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('input') input: FindCategoryInput) {
    await this.categoryService.delete(input._id);
    return 'Removed.';
  }
}
