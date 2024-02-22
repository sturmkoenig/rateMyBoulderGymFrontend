import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalService,
} from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'rate-my-boulder-gym';
  showFiller = false;

  isIFrame = false;
  loginName?: string;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: any,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
  ) {}

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  ngOnInit() {
    this.isIFrame = window !== window.parent && !window.opener;
    this.authService.initialize();
    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None,
        ),
        takeUntil(this._destroying$),
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  login() {
    this.authService.loginPopup().subscribe({
      next: (result) => {
        console.log(result);
        this.setLoginDisplay();
      },
      error: (error) => console.log(error),
    });
  }

  setLoginDisplay() {
    let accounts = this.authService.instance.getAllAccounts();
    if (accounts && accounts.length === 1) {
      this.loginName = this.authService.instance.getAllAccounts()[0].name;
    }
  }
}
