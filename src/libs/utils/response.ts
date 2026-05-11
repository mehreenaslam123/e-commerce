export type ResponseApi<T> = {
    data: T;
    message: string;
    status: string;
    statusCode: number;
}