
export class CategoryModel {
  id?: number | string;
  name?: string;
}

export interface PaginatorCategories {
  content: CategoryModel[];
  totalElements: number,
  size: number;
  number: number;
}
