export class Config {
    apiUrl: string;
    public constructor(init?: Partial<Config>) {
        Object.assign(this, init);
    }
}