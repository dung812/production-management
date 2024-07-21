export class PermissionGuard {
    // constructor(private service: AuthService, private route: Router) {}
  // canActivate() {
  //     if (this.service.HaveAccess()) {
  //         return true;
  //     } else {
  //         this.route.navigate([""]);
  //         return false;
  //     }
  // }
  constructor(
    // private readonly redirectService: RedirectService,
    // private readonly permissionStateService: PermissionStateService,
  ) {}

  // canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
  //   return this.hasPermission(next.data.permission);
  // }


  // private hasPermission(
  //   permissionData?: [PermissionNames, Privilege],
  //   segments: UrlSegment[] = [],
  // ): Observable<boolean> {
  //   if (permissionData) {
  //     const [permission, privilege] = permissionData;
  //     return this.permissionStateService
  //       .hasPermission$(permission, privilege)
  //       .pipe(
  //         tap((hasPermission) => {
  //           if (!hasPermission) {
  //             // HACK: This is a hack since using Router cannot navigate to an
  //             // already activated outlet (marketing-signage-request is on the
  //             // same outlet as any other non-auth route). Using
  //             // window.location.href to force reload also makes sense for
  //             // unauthenticated user.
  //             if (
  //               permission === PermissionNames.SupplierSignageManage &&
  //               segments.length > 1
  //             ) {
  //               // If permission is suppliersignage.manage, then it is the
  //               // Request Detail route.
  //               window.location.href = `${
  //                 window.location.origin
  //               }/marketing-signage-request/${segments.pop().path}`;
  //             } else if (
  //               permission === PermissionNames.SupplierSignageRequest
  //             ) {
  //               // If permission is suppliersignage.request, then it is the
  //               // Request route.
  //               window.location.href = `${window.location.origin}/marketing-signage-request/`;
  //             } else {
  //               this.redirectService.redirectToNotAuthorized();
  //             }
  //           }
  //         }),
  //       );
  //   }

  //   return of(true);
  // }
};
