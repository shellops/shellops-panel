import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public params: {
    host?: string
  } = {}

  public query: any = {};




  constructor(
    public readonly router: Router,
  ) {
    this.router.events.subscribe((next) => {
      if (next instanceof NavigationEnd) {
        this.onRouteChange();
      }
    });
  }

  private onRouteChange() {

    this.params = this.getActivatedRoute().snapshot.params;
    this.query = this.getActivatedRoute().snapshot.queryParams;

  }

  private getActivatedRoute(): ActivatedRoute {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
