import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isCollapsed = false
  url: string = ''
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.url = event.url
      }
      if (event instanceof NavigationEnd) {
      }
    })
  }

  isNavItemSelected(itemUrl: string = ''): boolean {
    // workaround for detecting basic route, for each of subroutes it should early exit with false
    if (itemUrl === '' && this.url.includes('block')) return false
    return this.url && this.url.includes(itemUrl)
  }
}
