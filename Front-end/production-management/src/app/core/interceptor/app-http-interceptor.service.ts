import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { STORAGE_KEYS, StorageService } from "../service/storage.service";

@Injectable({
    providedIn: "root",
})
export class AppHttpInterceptorService implements HttpInterceptor {
    constructor(private storage: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.get<string>(STORAGE_KEYS.TOKEN);
        let jwtToken = request.clone({
            setHeaders: {
                Authorization: "bearer " + token,
            },
        });
        return next.handle(jwtToken);
    }
}
