import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, ReplaySubject, map, pluck, startWith } from "rxjs";
import { SimplifiedCurrentUser } from "src/app/models/user.model";
import { SimplifiedUser } from "../models/detail.model";
import { UserAPI } from "src/app/apis/user.api";

interface DetailsState {
  user: SimplifiedUser | never | null;
  isLoading: boolean;
}

@Injectable()
export class DetailsService {
  state$: Observable<DetailsState>;
  private detailsSubject = new ReplaySubject<DetailsState>(1);

  id = '';

  constructor(
    private route: ActivatedRoute,
    private userApi: UserAPI,
    private router: Router
  ) {
    this.state$ = this.detailsSubject
      .asObservable()
      .pipe(startWith({
        user: null,
        isLoading: false
      }));

    this.route.params.pipe(
      map(x => x?.['id'])
      ).subscribe((id : string) => {
      this.id = id;
      this.getPokemonDetails(id);
    });
  }

  getPokemonDetails(id: string): void {
    this.detailsSubject.next({ user: null, isLoading: true });
    this.userApi.getUserDetail(id)
    .subscribe(user => {
      this.detailsSubject.next({ user, isLoading: false });
    });
  }
}
