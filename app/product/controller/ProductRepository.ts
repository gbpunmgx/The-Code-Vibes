import {ProductCategory} from "@/app/product/model/ProductCategory";

export interface ProductRepository {
    fetchProductsCategory(): Promise<ProductCategory[]>;

}