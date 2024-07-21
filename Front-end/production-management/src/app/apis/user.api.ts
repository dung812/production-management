import { HttpClient } from "@angular/common/http";
import { Observable, delay, map } from "rxjs";
import { User, UserForm, UserPaginatedQuery } from "../models/user.model";
import { BaseApi } from "./base.api";
import { PaginatedModel, SORT_ORDER_TYPE } from "../models/common.model";
import { Injectable } from "@angular/core";
import { SimplifiedUser, UserDetailRes } from "../modules/user/components/detail/models/detail.model";

@Injectable({
  providedIn: "root",
})
export class UserAPI extends BaseApi<User, UserForm> {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    protected getResourceUrl(): string {
        return "users";
    }

    getWithPaging(query: UserPaginatedQuery | undefined): Observable<PaginatedModel<User>> {
        const queryObject =
        {
            searchString: query?.searchString ?? "",
            role: query?.role ?? "",
            limit: query?.limit.toString() ?? "10",
            page: query?.page.toString() ?? "1",
            sortColumn: query?.sortColumn ?? "",
            sortOrder: query?.sortOrder ?? SORT_ORDER_TYPE.Ascending.toString(),
        }

        return this.httpClient.get<PaginatedModel<User>>(`${this.BASE_URL}/${this.getResourceUrl()}?${new URLSearchParams(queryObject).toString()}`)
    }


    getUserDetail(id: string): Observable<SimplifiedUser> {
        console.log(id);
        return this.httpClient.get<UserDetailRes>(`${this.BASE_URL}/${this.getResourceUrl()}/${id}`).pipe(
            delay(1500),
            map((user: UserDetailRes) => UserAPI.getSimplifiedUser(user))
        );
    }

    private static getSimplifiedUser(user: UserDetailRes | null): SimplifiedUser {
        return {
            name: user?.name || "",
            id: user?.id || "",
            userName: user?.userName || "",
            email: user?.email || "",
            roles: user?.roles || "",
        };
    }
}
