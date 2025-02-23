import {ProductCategory} from "@/app/product/category/model/ProductCategory";

export interface ProductRepository {
    fetchProductsCategory(): Promise<ProductCategory[]>;

}