import { ProductCategory } from "@/app/category/model/ProductCategory";
import { ApiResponseListBase } from "@/app/api_utils/ApiResponseListBase";
import ApiClient from "@/app/api_utils/ApiClient";

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
}
