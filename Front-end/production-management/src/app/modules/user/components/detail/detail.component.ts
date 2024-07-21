import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { createPatch } from 'rfc6902';
import { DetailsService } from "./services/detail.service";
import {
    injectDestroyService,
    provideDestroyService,
} from "src/app/shared/services/destroy-service.service";
import { map, takeUntil } from "rxjs";
import { EditUserComponent } from "../edit/edit-user.component";
import { UpdatedUserForm } from "./models/detail.model";
import { UtilHelper } from "src/app/helper/utils.helper";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DetailsService, provideDestroyService()]
})
export class DetailComponent implements OnInit {
    private destroy$ = injectDestroyService();
    state$ = this.detailService.state$;
    
    private userId:string = '';
    isShowModal = false;
    loadingButton = {
        updateButton: false,
        deleteButton: false
    };
    
    @ViewChild('editForm') editFormComponent: EditUserComponent;

    constructor(
        private detailService: DetailsService, 
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.pipe(map(x => x?.['id'])).subscribe((id : string) => {
            this.userId = id;
            this.detailService.getUserDetail(id);
        });
    }

    ngOnInit(): void {
        this.state$.subscribe(item=> console.log(item));
        this.state$.pipe(takeUntil(this.destroy$));
    }

    showModal(): void {
        this.isShowModal = true;
    }

    closeModal(): void {
        this.isShowModal = false;
    }

    handleOk(): void {
        this.editFormComponent.submitForm((isValid: boolean, formValue: UpdatedUserForm | null) => {
          if (isValid && formValue !== null) {
            this.updateUser(formValue);
            this.closeModal();
          }
        });
    }

    deleteUser() {
        // this.loadingButton.deleteButton = true;
        // this.detailService.deleteUser(this.userId).subscribe(() => {
        //     this.router.navigate(['/']);
        //     this.loadingButton.deleteButton = false;
        // });
    }

    private updateUser(formValue: UpdatedUserForm): void {
        this.loadingButton.updateButton = true;
        const oldUserData = this.detailService.getState().user;
    
        if (oldUserData !== null) {
          const newUserData = UtilHelper.updateProperties(structuredClone(oldUserData), formValue);
          this.detailService.updateUser(this.userId, createPatch(oldUserData, newUserData), () => {
            this.loadingButton.updateButton = false;
          })
        }
    }

    
}