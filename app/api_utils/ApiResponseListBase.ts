export class ApiResponseListBase<T> {
    status: number;
    message: string;
    result: T[];

    static fromJson<T>(json: any, transform: (item: any) => T): ApiResponseListBase<T> {
        const instance = new ApiResponseListBase<T>();
        instance.status = json.status;
        instance.message = json.message;
        instance.result = json.result.map(transform);
        return instance;
    }
}
