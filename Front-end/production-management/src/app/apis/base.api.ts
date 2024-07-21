import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


export abstract class BaseApi<T, U> {
  public readonly BASE_URL: string = environment.apiEndPoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(protected httpClient: HttpClient) {}

  protected abstract getResourceUrl(): string;

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.BASE_URL}/${this.getResourceUrl()}`);
  }

  getById(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.BASE_URL}/${this.getResourceUrl()}/${id}`);
  }

  create(item: U): Observable<U> {
    return this.httpClient.post<U>(`${this.BASE_URL}/${this.getResourceUrl()}`, item, this.httpOptions);
  }

  update(id: number | string, item: U): Observable<U> {
    return this.httpClient.put<U>(`${this.BASE_URL}/${this.getResourceUrl()}`, {id: id, ...item}, this.httpOptions);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${this.getResourceUrl()}/${id}`);
  }
}
