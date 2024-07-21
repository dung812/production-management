import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DetailsService } from "./services/detail.service";
import {
    injectDestroyService,
    provideDestroyService,
} from "src/app/shared/services/destroy-service.service";
import { takeUntil } from "rxjs";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DetailsService, provideDestroyService()],
})
export class DetailComponent implements OnInit {
    private destroy$ = injectDestroyService();
    state$ = this.details.state$;
    constructor(private details: DetailsService) {}
    ngOnInit(): void {
        this.state$.pipe(takeUntil(this.destroy$));
    }
}
