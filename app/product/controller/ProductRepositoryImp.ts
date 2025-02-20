import { ProductCategory } from "@/app/category/model/ProductCategory";
import { ApiResponseListBase } from "@/app/api_utils/ApiResponseListBase";
import ApiClient from "@/app/api_utils/ApiClient";
import {ProductModel} from "@/app/product/model/ProductModel";

export class ProductRepositoryImpl {
    private readonly apiClient: ApiClient;

    constructor() {
        this.apiClient = new ApiClient();
    }

    async fetchProductCategories(): Promise<ProductCategory[]> {
        try {
            const response = await this.apiClient.get('categories/');
            const apiResponse = ApiResponseListBase.fromJson<ProductCategory>(
                response,
                (category: any) => new ProductCategory(
                    category.id,
                    category.name,
                    category.description,
                    category.active
                )
            );

            if (apiResponse.status !== 200) {
                throw new Error(`Error: ${apiResponse.message}`);
            }

            return apiResponse.result;
        } catch (error) {
            throw error;
        }
    }
    async fetchProduct(): Promise<ProductModel[]> {
        try {
            const response = await this.apiClient.get('products/');
            const apiResponse = ApiResponseListBase.fromJson<ProductModel>(
                response,
                (product: any) => new ProductModel(
                    product.id,
                    product.name,
                    product.description,
                    product.price,
                    product.active,
                    product.categoryId,
                    product.images
                )
            );

            if (apiResponse.status !== 200) {
                throw new Error(`Error: ${apiResponse.message}`);
            }

            return apiResponse.result;
        } catch (error) {
            throw error;
        }
    }

}
