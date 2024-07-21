import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Operation } from "rfc6902";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

export abstract class BaseApi<T> {
    public readonly BASE_URL: string = environment.apiEndPoint;

    httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    constructor(protected httpClient: HttpClient) {}

    protected abstract getResourceUrl(): string;

    getAll(): Observable<T[]> {
        return this.httpClient.get<T[]>(`${this.BASE_URL}/${this.getResourceUrl()}`);
    }

    getById<S>(id: string | number, mapper: (item: T | null) => S): Observable<S> {
        return this.httpClient.get<T>(`${this.BASE_URL}/${this.getResourceUrl()}/${id}`).pipe(
          map(item => this.getSimplified(item, mapper))
        );
    }

    create(item: T): Observable<T> {
        return this.httpClient.post<T>( `${this.BASE_URL}/${this.getResourceUrl()}`, item, this.httpOptions);
    }

    update(id: string | string, item: T ): Observable<T> {
        return this.httpClient.put<T>( `${this.BASE_URL}/${this.getResourceUrl()}`,{ id: id, ...item }, this.httpOptions);
    }

    patchUpdate(id: string, jsonPatch: Operation[]): Observable<T> {
        return this.httpClient.patch<T>(`${this.BASE_URL}/${this.getResourceUrl()}/${id}`, jsonPatch);
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.BASE_URL}/${this.getResourceUrl()}/${id}`);
    }

    protected getSimplified<S>(item: T | null, mapper: (item: T | null) => S): S {
        return mapper(item);
    }
}
