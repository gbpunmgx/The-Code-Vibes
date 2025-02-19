import {ProductCategory} from "@/app/category/model/ProductCategory";

export interface ProductRepository {
    fetchProductsCategory(): Promise<ProductCategory[]>;

}