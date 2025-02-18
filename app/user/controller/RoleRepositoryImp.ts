import {ProductCategory} from "@/app/category/ProductCategory";
import {ApiResponseObjectBase} from "@/app/api_utils/ApiResponseObjectBase";
import ApiClient from "@/app/api_utils/ApiClient";


export class RoleRepositoryImpl {
    private readonly apiClient: ApiClient;

    constructor(apiClient?: ApiClient) {
        this.apiClient = apiClient ?? new ApiClient();
    }

    async createRole(productCategory: ProductCategory): Promise<ApiResponseObjectBase<ProductCategory>> {
        const productCategoryDetails: { name: string; description: string; isActive: boolean } = {
            name: productCategory.name,
            description: productCategory.description,
            isActive: productCategory.isActive,
        };
        const productCategoryWithNullId = {
            ...productCategoryDetails,
            id: null,
        };

        try {
            console.log("Posting Category:", productCategoryWithNullId); // Log the payload to confirm
            const response = await this.apiClient.post('categories/', productCategoryWithNullId);  // Send the request with null ID
            return ApiResponseObjectBase.fromJson<ProductCategory>(
                response,
                (category: any) => new ProductCategory(category.id, category.name, category.description, category.isActive)
            );
        } catch (error) {
            console.error("Error posting category:", error);
            throw error;
        }
    }


    async updateRole(id: String, productCategory: ProductCategory) {

        const editCategory = {
            id: productCategory.id,
            name: productCategory.name,
            description: productCategory.description,
            isActive: productCategory.isActive,
        };
        try {
            console.log("Posting Category:", editCategory);
            await this.apiClient.put('categories/' + id, productCategory);
        } catch (error) {
            console.error("Error posting category:", error);
            throw error;
        }
    }

    async deleteRole(id: string) {
        try {
           await this.apiClient.delete('categories/' + id);

        } catch (error) {
            console.error("Error deleting category:", error);
            throw error;
        }
    }

}
