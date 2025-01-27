import { ApiResponseBase } from './ApiResponseBase';

export class ApiResponseObjectBase<T> extends ApiResponseBase<T> {
    constructor(type: string, status: number, message: string, result: T) {
        super(type, status, message, result);
    }

    static fromJson<T>(json: any, transformResult: (result: any) => T): ApiResponseObjectBase<T> {
        return new ApiResponseObjectBase<T>(
            json.type,
            json.status,
            json.message,
            transformResult(json.result)
        );
    }
}
