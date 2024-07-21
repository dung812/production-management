import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { SimplifiedUser } from "../detail/models/detail.model";
import { injectDestroyService, provideDestroyService } from "src/app/shared/services/destroy-service.service";

@Component({
    selector: "app-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideDestroyService()]
})
export class EditUserComponent implements OnInit, OnChanges {
    private destroy$ = injectDestroyService();
    
    @Input() userDetail: SimplifiedUser | null;


    validateForm: FormGroup<{
        email: FormControl<string>;
        name: FormControl<string>;
    }>;

    constructor(private fb: NonNullableFormBuilder) {
        this.validateForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            name: ['', [Validators.required]],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['userDetail'] && changes['userDetail'].currentValue !== null) {
            this.validateForm.patchValue({
                email: this.userDetail?.email,
                name: this.userDetail?.name,
            })
        }
    }

    ngOnInit(): void {}

    submitForm(callback: Function): void {
        if (this.validateForm.valid) {
            callback(this.validateForm.valid, this.validateForm.value)
        } else {
            Object.values(this.validateForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            callback(this.validateForm.valid, null)
        }
    }
}
