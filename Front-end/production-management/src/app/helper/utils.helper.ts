
export class UtilHelper {
    /**
     * Decodes a JWT token and extracts its payload.
     *
     * @param token - The JWT token to decode.
     * @returns The decoded payload from the token.
     */
    static encodedToken(token: string) {
        var _extractedtoken = token.split(".")[1];
        var _atobdata = atob(_extractedtoken);
        return JSON.parse(_atobdata); // Get data from token
    }

    /**
     * Updates the properties of a target object with the properties from a source object.
     *
     * @template T - The type of the target and source objects. Must be an object type.
     * @param target - The object whose properties will be updated.
     * @param source - The object whose properties will be used to update the target object.
     * @returns The updated target object.
     */
    static updateProperties<T extends object>(target: T, source: Partial<T>): T {
        return Object.assign(target, source);
    }
}
