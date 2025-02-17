import {ProductCategory} from "@/app/category/ProductCategory";

export interface ProductRepository {
    fetchProductsCategory(): Promise<ProductCategory[]>;

}