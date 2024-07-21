import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Operation } from "rfc6902";
import { BehaviorSubject, Observable } from "rxjs";
import { UserAPI } from "src/app/apis/user.api";
import { SimplifiedUser } from "../models/detail.model";

interface DetailState {
  user: SimplifiedUser | never | null;
  isLoading: boolean;
}

@Injectable()
export class DetailsService {
  state$: Observable<DetailState>;
  private detailsSubject = new BehaviorSubject<DetailState>({
    user: null,
    isLoading: false
  });

  constructor(
    private route: ActivatedRoute,
    private userApi: UserAPI,
    private router: Router
  ) {
    this.state$ = this.detailsSubject.asObservable();
  }

  setState(updatedState: DetailState): void {
    this.detailsSubject.next(updatedState); 
  }
  getState(): DetailState {
    return this.detailsSubject.value;
  }

  getUserDetail(id: string): void {
    this.setState({ ...this.detailsSubject.value, isLoading: true });
    this.userApi.getUserDetail(id).subscribe(user => {
        this.setState({ user, isLoading: false });
    });
  }

  updateUser(id: string, jsonPatch: Operation[], callback?: Function): void {
    this.userApi.patchUpdate(id, jsonPatch).subscribe(user => {
        if(user) {
            this.setState({ ...this.detailsSubject.value, user });
            callback && callback();
        }
    });
  }
}
