import { BASE_URL } from '@/app/config/ApiConstants';

class ApiError extends Error {
    statusCode: number;
    details: any;

    constructor(statusCode: number, message: string, details: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'ApiError';
    }
}

class ApiClient {
    static instance: ApiClient | null = null;
    baseURL: string;

    constructor(baseURL: string = BASE_URL) {
        if (ApiClient.instance) {
            return ApiClient.instance;
        }

        this.baseURL = baseURL;
        ApiClient.instance = this;
    }

    async request(endpoint: string, method: string = 'GET', body: any = null) {
        const headers = {
            'Content-Type': 'application/json',
        };

        const options: RequestInit = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);

            let responseBody;
            try {
                responseBody = await response.json();
            } catch (jsonError) {
                throw new ApiError(response.status, 'Failed to parse JSON response.', {
                    error: jsonError,
                });
            }
            if (!response.ok) {
                this.handleHttpError(response.status, responseBody);
            }

            return responseBody;
        } catch (error: any) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(0, 'Unexpected API error occurred.', { error });
            }
        }
    }

    private handleHttpError(statusCode: number, responseBody: any) {
        let errorMessage: string;

        switch (statusCode) {
            case 400:
                errorMessage = responseBody?.message || 'Bad Request: Invalid data provided.';
                break;
            case 401:
                errorMessage = responseBody?.message || 'Unauthorized: Please log in.';
                break;
            case 403:
                errorMessage = responseBody?.message || 'Forbidden: Access denied.';
                break;
            case 404:
                errorMessage = responseBody?.message || 'Not Found: Resource not found.';
                break;
            case 500:
                errorMessage = responseBody?.message || 'Internal Server Error: Something went wrong on the server.';
                break;
            default:
                errorMessage = responseBody?.message || `Unexpected Error: ${statusCode}`;
        }

        throw new ApiError(statusCode, errorMessage, responseBody);
    }

    async get(endpoint: string) {
        return this.request(endpoint, 'GET');
    }

    async post(endpoint: string, body: any) {
        return this.request(endpoint, 'POST', body);
    }

    async put(endpoint: string, body: any) {
        return this.request(endpoint, 'PUT', body);
    }

    async delete(endpoint: string) {
        return this.request(endpoint, 'DELETE');
    }
}

export default ApiClient;
