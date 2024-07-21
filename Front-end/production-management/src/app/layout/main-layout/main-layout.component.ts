import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/service/auth.service";
import { STORAGE_KEYS, StorageService } from "src/app/core/service/storage.service";
import { SimplifiedCurrentUser } from "src/app/models/user.model";

@Component({
    selector: "app-main-layout",
    templateUrl: "./main-layout.component.html",
    styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit {
    isCollapsed = false;
    isLoggedIn: boolean = false;
    user: SimplifiedCurrentUser | null = {} as SimplifiedCurrentUser;

    constructor(
        private authService: AuthService,
        private storage: StorageService
    )
    {
        this.user = this.storage.get<SimplifiedCurrentUser>(STORAGE_KEYS.USER);
        this.isLoggedIn = authService.isAuthenticated();
    }

    ngOnInit(): void {
    }

    handleLogout() {
        this.authService.logout();
    }
}
