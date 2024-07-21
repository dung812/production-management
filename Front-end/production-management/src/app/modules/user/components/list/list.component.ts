import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs";
import {
    injectDestroyService,
    provideDestroyService,
} from "src/app/shared/services/destroy-service.service";
import { ListService } from "./services/list.service";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ListService, provideDestroyService()],
})
export class ListComponent implements OnInit {
    private destroy$ = injectDestroyService();
    state$ = this.list.state$;
    searchQuery = new FormControl("");

    constructor(private list: ListService) {
        this.searchQuery.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
            this.list.setQuery({
                searchString: value,
            });
        });
    }

    ngOnInit() {
        this.list.setQuery({});
        this.state$.pipe(takeUntil(this.destroy$));
    }

    onPageChanged(targetPage: number) {
        this.list.setQuery({
            page: targetPage,
        });
    }
    onSizeChanged(targetPageSize: number) {
        console.log(targetPageSize);
        this.list.setQuery({
            pageSize: targetPageSize,
        });
    }

    onCurrentPageDataChange(users: any) {
        console.log(users);
    }
}
