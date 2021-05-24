export enum SortByProperty {
    gateway = 0,
    address = 1,
    interface = 2
}

export enum SortType {
    asc = 0,
    desc = 1
}

export class SortByPropertyExt {
    public static getName(prop: SortByProperty) {
        switch (prop) {
            case SortByProperty.interface:
                return 'interface';
            case SortByProperty.gateway:
                return 'gateway'
            case SortByProperty.address:
                return 'mask'
            default:
                return '';
        }
    }

}
