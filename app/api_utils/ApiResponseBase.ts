export class ApiResponseBase<T> {
    type: string;
    status: number;
    message: string;
    result: T;

    constructor(type: string, status: number, message: string, result: T) {
        this.type = type;
        this.status = status;
        this.message = message;
        this.result = result;
    }

    static fromJson<T>(json: any, transformResult: (result: any) => T): ApiResponseBase<T> {
        return new ApiResponseBase<T>(
            json.type,
            json.status,
            json.message,
            transformResult(json.result)
        );
    }

    toJson(transformResult: (result: T) => any): any {
        return {
            type: this.type,
            status: this.status,
            message: this.message,
            result: transformResult(this.result),
        };
    }
}
