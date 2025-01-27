import { ApiResponseBase } from './ApiResponseBase';

export class ApiResponseListBase<T> extends ApiResponseBase<T[]> {
    constructor(type: string, status: number, message: string, result: T[]) {
        super(type, status, message, result);
    }

    static fromJson<T>(json: any, transformResult: (result: any) => T[]): ApiResponseListBase<T> {
        return new ApiResponseListBase<T>(
            json.type,
            json.status,
            json.message,
            transformResult(json.result)
        );
    }
}
