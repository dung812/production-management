
export class UtilHelper {
    static encodedToken(token: string) {
        var _extractedtoken = token.split(".")[1];
        var _atobdata = atob(_extractedtoken);
        return JSON.parse(_atobdata); // Get data from token
    }
}
