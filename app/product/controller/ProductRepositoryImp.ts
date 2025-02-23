import { ProductCategory } from "@/app/product/category/model/ProductCategory";
import { ApiResponseListBase } from "@/app/api_utils/ApiResponseListBase";
import ApiClient from "@/app/api_utils/ApiClient";
import { ProductModel } from "@/app/product/model/ProductModel";

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

    /**
     * Post (Create) a new product
     */
    async postProduct(product: ProductModel): Promise<ProductModel> {
        try {
            const response = await this.apiClient.post('products/', {
                id: null,
                name: product.name,
                description: product.description,
                price: product.price,
                active: product.active,
                categoryId: product.categoryId,
                images: product.images
            });

            if (response.status !== 201) {
                throw new Error(`Failed to create product: ${response.statusText}`);
            }

            return new ProductModel(
                response.data.id,
                response.data.name,
                response.data.description,
                response.data.price,
                response.data.active,
                response.data.categoryId,
                response.data.images
            );
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(product: ProductModel): Promise<ProductModel> {
        try {
            const response = await this.apiClient.put(`products/${product.id}`, {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                active: product.active,
                categoryId: product.categoryId,
                images: product.images
            });

            if (response.status !== 200) {
                throw new Error(`Failed to update product: ${response.statusText}`);
            }

            return new ProductModel(
                response.data.id,
                response.data.name,
                response.data.description,
                response.data.price,
                response.data.active,
                response.data.categoryId,
                response.data.images
            );
        } catch (error) {
            throw error;
        }
    }


    /**
     * Delete a product by ID
     */
    async deleteProduct(productId: string | undefined): Promise<void> {
        try {
            await this.apiClient.delete('products/' + productId);

        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

}
