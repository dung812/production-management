import { Injectable } from "@angular/core";
import {
    BehaviorSubject,
    Observable,
    ReplaySubject,
    delay,
    map,
    of,
    startWith,
    switchMap,
    withLatestFrom,
} from "rxjs";
import { UserAPI } from "src/app/apis/user.api";
import { INIT_PAGE_SIZE } from "src/app/constants";
import { PaginatedModel } from "src/app/models/common.model";
import { User, UserPaginatedQuery } from "src/app/models/user.model";

interface ListState {
    isLoading: boolean;
    pageSize: number;
    currentPage: number;
    totalItems: number;
    totalPages: number;
    users: User[]; // the list of Users
    orgUsers: User[]; // the original, unfiltered list of Users before any filtering or searching has been applied.
}

@Injectable()
export class ListService {
    private paginatedQuery: UserPaginatedQuery = {
        limit: INIT_PAGE_SIZE,
        page: 1,
        role: null,
        searchString: null,
        sortColumn: null,
        sortOrder: null,
    };

    private stateSubject = new BehaviorSubject<ListState>({
        isLoading: false,
        pageSize: INIT_PAGE_SIZE,
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        users: [],
        orgUsers: [],
    });

    state$: Observable<ListState> = this.stateSubject.asObservable();

    constructor(private userApi: UserAPI) {}

    setState(paginatedQuery: UserPaginatedQuery): void {
        this.stateSubject.next({
            ...this.stateSubject.value,
            isLoading: true, // set loading state
        });

        this.userApi
            .getWithPaging(paginatedQuery)
            .pipe(
                delay(1500),
                map((user: PaginatedModel<User>) => {
                    this.stateSubject.next({
                        ...this.stateSubject.value,
                        isLoading: false, // set loading state
                        users: user.items,
                        orgUsers: user.items,
                        totalItems: user.totalItems,
                        totalPages: user.totalPages,
                        pageSize: paginatedQuery.limit,
                    });
                })
            )
            .subscribe();
        // of(null)
        //     .pipe(
        //         withLatestFrom(this.state$), // allows access to the current state within the subsequent logic
        //         switchMap(([, state]) => {
        //             this.stateSubject.next({
        //                 ...state,
        //                 isLoading: true, // set loading state
        //             });

        //             // fetch data
        //             return this.userApi.getWithPaging(paginatedQuery).pipe(
        //                 delay(1500),
        //                 map((user: PaginatedModel<User>) => {
        //                     this.stateSubject.next({
        //                         ...state,
        //                         isLoading: false, // set loading state
        //                         users: user.items,
        //                         orgUsers: user.items,
        //                         totalItems: user.totalItems,
        //                         totalPages: user.totalPages,
        //                         pageSize: paginatedQuery.limit,
        //                     });
        //                 })
        //             );
        //         })
        //     )
        //     .subscribe();
    }

    getQuery(): UserPaginatedQuery {
        return this.paginatedQuery;
    }

    setQuery({
        page,
        pageSize,
        searchString,
    }: {
        page?: number;
        pageSize?: number;
        searchString?: string | null;
    }): void {
        if (page !== undefined && page !== null) {
            this.paginatedQuery.page = page;
        }
        if (pageSize !== undefined && pageSize !== null) {
            this.paginatedQuery.limit = pageSize;
        }
        if (searchString !== undefined && searchString !== null) {
            this.paginatedQuery.searchString = searchString.length === 0 ? null : searchString;
        }

        this.setState(this.paginatedQuery);
    }
}
