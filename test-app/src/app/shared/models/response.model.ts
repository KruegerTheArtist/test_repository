export class Response {
    message: string;
    code: number;         // в конце документа описаны возможные коды
    successful: boolean;
    payload: any;

    public constructor(init?: Partial<Response>) {
        Object.assign(this, init);
    }
}