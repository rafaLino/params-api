export class Notification {
    data: unknown;
    error: boolean;
    statusCode: number;

    private constructor(data: unknown, error: boolean, statusCode: number) {
        this.data = data;
        this.error = error;
        this.statusCode = statusCode
    }

    static success(data: unknown = null, statusCode: number = 200) {
        return new Notification(data, false, statusCode);
    }

    static fail(message: string | Array<string>, statusCode: number = 400) {
        return new Notification(message, true, statusCode);
    }
}