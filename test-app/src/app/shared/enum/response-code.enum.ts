export enum RESPONSE_CODE {
    // Error
    ERR_UNKNOWN = -1,               // unclassified error
    ERR_INVALID_JSON = -2,          // invalid JSON passed
    ERR_INVALID_METHOD = -3,        // unsupported HTTP method

    ERR_ROUTE_OBJECT_EXPECTED = 0,  // 'create/update route' methods expect Omit<Route, 'uuid'> payload
    ERR_INVALID_IPV4 = 1,           // invalid IPv4 passed as 'address', 'mask' or 'gateway'
    ERR_INVALID_NETMASK = 2,        // invalid netmask passed
    ERR_INVALID_SUBNET = 3,         // 'address' & 'mask' are not a subnet
    ERR_NOT_FOUND = 4,              // route not found
    ERR_DUPLICATE = 5,              // route already exists
    ERR_NO_DATA = 6,                // empty object passed to the 'update route' method
    ERR_UUID_ALREADY_SET = 7,       // 'uuid' passed to the'update route' method

    // Success
    ROUTE_CREATED = 100,            // route successfully created
    ROUTE_CHANGED = 101,            // route successfully updated
    ROUTE_DELETED = 102,            // route successfully deleted
    ROUTE_FOUND = 103,              // route with given UUID successfully found
    ROUTE_IS_VALID = 104,           // internal code
    ROUTE_LIST_EXISTS = 105,        // return code for 'get all routes' method

    IP_ROUTED = 200,                // some route for passed IP found
    IP_UNROUTED = 201,              // no route for passed IP found
}

export class ResponseCodeExt {
    public static getErrorMessage(code: RESPONSE_CODE) {
        switch (code) {
            case RESPONSE_CODE.ERR_UNKNOWN:
                return 'unclassified error';
            case RESPONSE_CODE.ERR_INVALID_JSON:
                return 'invalid JSON passed';
            case RESPONSE_CODE.ERR_INVALID_METHOD:
                return 'unsupported HTTP method';
            case RESPONSE_CODE.ERR_ROUTE_OBJECT_EXPECTED:
                return '\'create/update route\' methods expect Omit<Route, \'uuid\'> payload';
            case RESPONSE_CODE.ERR_INVALID_IPV4:
                return 'invalid IPv4 passed as \'address\', \'mask\' or \'gateway\'';
            case RESPONSE_CODE.ERR_INVALID_NETMASK:
                return 'invalid netmask passed';
            case RESPONSE_CODE.ERR_INVALID_SUBNET:
                return '\'address\' & \'mask\' are not a subnet';
            case RESPONSE_CODE.ERR_NOT_FOUND:
                return 'route not found';
            case RESPONSE_CODE.ERR_DUPLICATE:
                return 'route already exists';
            case RESPONSE_CODE.ERR_NO_DATA:
                return 'empty object passed to the \'update route\' method';
            case RESPONSE_CODE.ERR_UUID_ALREADY_SET:
                return '\'uuid\' passed to the\'update route\' method';
            default:
                return '';
                break;
        }
    }

    public static isErrorResponse(code: RESPONSE_CODE) {
        return code === RESPONSE_CODE.ERR_UNKNOWN
            || code === RESPONSE_CODE.ERR_INVALID_JSON
            || code === RESPONSE_CODE.ERR_INVALID_METHOD
            || code === RESPONSE_CODE.ERR_ROUTE_OBJECT_EXPECTED
            || code === RESPONSE_CODE.ERR_INVALID_IPV4
            || code === RESPONSE_CODE.ERR_INVALID_NETMASK
            || code === RESPONSE_CODE.ERR_INVALID_SUBNET
            || code === RESPONSE_CODE.ERR_NOT_FOUND
            || code === RESPONSE_CODE.ERR_DUPLICATE
            || code === RESPONSE_CODE.ERR_NO_DATA
            || code === RESPONSE_CODE.ERR_UUID_ALREADY_SET;
    }

}
