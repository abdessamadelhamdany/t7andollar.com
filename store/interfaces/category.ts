import { Category } from '@prisma/client';

export interface CategoryForm extends Partial<Category> {}

export interface CategoryState {
  categoryForm: CategoryForm;
  categories: Category[];
}
