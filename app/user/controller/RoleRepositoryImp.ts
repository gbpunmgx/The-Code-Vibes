import {ApiResponseObjectBase} from "@/app/api_utils/ApiResponseObjectBase";
import ApiClient from "@/app/api_utils/ApiClient";
import {ApiResponseListBase} from "@/app/api_utils/ApiResponseListBase";
import {Role} from "@/app/user/model/Role";
import {ProductCategory} from "@/app/product/category/model/ProductCategory";

export class RoleRepositoryImpl {
    private readonly apiClient: ApiClient;

    constructor(apiClient?: ApiClient) {
        this.apiClient = apiClient ?? new ApiClient();
    }

    async createRole(role: Role): Promise<ApiResponseObjectBase<Role>> {
        const roleDetails: { id: string; roleName: string; } = {
            id: role.id,
            roleName: role.roleName,
        };
        const roleWithNullId = {
            ...roleDetails,
            id: null,
        };

        try {
            console.log("Posting Role:", roleWithNullId);
            const response = await this.apiClient.post('roles/', roleWithNullId);
            return ApiResponseObjectBase.fromJson<Role>(
                response,
                (data: any) => new Role(data.id, data.roleName)
            );
        } catch (error) {
            console.error("Error posting role:", error);
            throw error;
        }
    }


    async updateRole(id: string, role: Role) {
        const editRole: { id: string; roleName: string; } = {
            id: role.id,
            roleName: role.roleName,
        };

        try {
            console.log("Updating Role:", editRole);
            await this.apiClient.put('roles/' + id, editRole);
        } catch (error) {
            console.error("Error updating role:", error);
            throw error;
        }
    }

    async deleteRole(id: string) {
        try {
            await this.apiClient.delete('roles/' + id);
        } catch (error) {
            console.error("Error deleting role:", error);
            throw error;
        }
    }

    async getRoles(): Promise<Role[]> {
        try {
            const response = await this.apiClient.get('roles/');
            const apiResponse = ApiResponseListBase.fromJson<Role>(
                response,
                (role: any) => new Role(role.id, role.roleName)
            );
            if (apiResponse.status !== 200) {
                throw new Error(`Error: ${apiResponse.message}`);
            }
            return apiResponse.result;

        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    }

}
