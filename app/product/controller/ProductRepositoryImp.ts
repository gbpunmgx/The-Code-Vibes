import ApiClient from "@/app/api_utils/ApiClient";
import { ProductCategory } from "@/app/product/model/ProductCategory";
import { ApiResponseListBase } from "@/app/api_utils/ApiResponseListBase";

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
                (category: any) => new ProductCategory(category.id, category.name, category.description, category.isActive)
            );
            if (apiResponse.status !== 200) {
                throw new Error(`Error: ${apiResponse.message}`);
            }
            return apiResponse.result;
        } catch (error) {
            console.error('Error fetching product categories:', error);
            throw error;
        }
    }
}
