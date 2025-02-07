export class ApiResponseListBase<T> {
    status: number;
    message: string;
    result: T[];

    static fromJson<T>(json: any, transform: (item: any) => T): ApiResponseListBase<T> {
        return {
            status: json.status,
            message: json.message,
            result: json.result.map(transform),
        };
    }
}
