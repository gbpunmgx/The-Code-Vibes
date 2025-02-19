import {ApiResponseObjectBase} from "@/app/api_utils/ApiResponseObjectBase";
import ApiClient from "@/app/api_utils/ApiClient";
import {ApiResponseListBase} from "@/app/api_utils/ApiResponseListBase";
import {Role} from "@/app/user/model/Role";

export class RoleRepositoryImpl {
    private readonly apiClient: ApiClient;

    constructor(apiClient?: ApiClient) {
        this.apiClient = apiClient ?? new ApiClient();
    }

    async createRole(role: { role: string }): Promise<ApiResponseObjectBase<Role>> {
        const roleDetails: { name: string } = {
            name: role.role,
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
                (role: any) => new Role(role.id, role.role)
            );
        } catch (error) {
            console.error("Error posting role:", error);
            throw error;
        }
    }

    async updateRole(id: string, role: Role) {
        const editRole = {
            id: role.id,
            role: role.roleName,
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
