export interface Category {
  categoryname: string;
  _id?: string;
  categoryImage?: string;
  categoryDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: boolean;
}

export type CategoryReducerInitial = {
  loading: boolean;
  err: boolean | string;
  categories: Category[] | null;
};

export interface AddCategoryPayload {
  category: Category;
}