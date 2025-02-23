import ApiClient from "@/app/api_utils/ApiClient";
import {ProductCategory} from "@/app/product/category/model/ProductCategory";
import {ApiResponseObjectBase} from "@/app/api_utils/ApiResponseObjectBase";


export class CategoryRepositoryImpl {
    private readonly apiClient: ApiClient;

    constructor(apiClient?: ApiClient) {
        this.apiClient = apiClient ?? new ApiClient();
    }

    async postCategory(productCategory: ProductCategory): Promise<ApiResponseObjectBase<ProductCategory>> {
        const productCategoryDetails: { name: string; description: string; active: boolean } = {
            name: productCategory.name,
            description: productCategory.description,
            active: productCategory.active,
        };
        const productCategoryWithNullId = {
            ...productCategoryDetails,
            id: null,
        };

        try {
            console.log("Posting Category:", productCategoryWithNullId);
            const response = await this.apiClient.post('categories/', productCategoryWithNullId);
            return ApiResponseObjectBase.fromJson<ProductCategory>(
                response,
                (category: any) => new ProductCategory(category.id, category.name, category.description, category.active)
            );
        } catch (error) {
            console.error("Error posting category:", error);
            throw error;
        }
    }


    async updateCategory(id: String, productCategory: ProductCategory) {

        const editCategory = {
            id: productCategory.id,
            name: productCategory.name,
            description: productCategory.description,
            active: productCategory.active,
        };
        try {
            console.log("Posting Category:", editCategory);
            await this.apiClient.put('categories/' + id, productCategory);
        } catch (error) {
            console.error("Error posting category:", error);
            throw error;
        }
    }

    async deleteCategory(id: string) {
        try {
           await this.apiClient.delete('categories/' + id);

        } catch (error) {
            console.error("Error deleting category:", error);
            throw error;
        }
    }

}
