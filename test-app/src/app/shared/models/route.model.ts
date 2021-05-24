export class Route {
    uuid: string;
    address: string;
    mask: string;
    gateway: string;
    interface: string;

    public constructor(init?: Partial<Route>) {
        Object.assign(this, init);
    }
}