import ApiClient from "@/app/api_utils/ApiClient";
import {User} from "@/app/types/User";

const apiClient = new ApiClient();

export const fetchDashboardData = async (): Promise<User[]> => {
    try {
        const response = await apiClient.get('user/all');
        return response.result.map((item: any) => new User(item));
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
