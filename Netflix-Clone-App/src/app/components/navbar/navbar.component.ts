import { Component, HostListener, signal } from '@angular/core';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matExpandMoreRound,
  matSearchRound,
} from '@ng-icons/material-icons/round';
import { matNotificationsOutline } from '@ng-icons/material-icons/outline';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavbarItemComponent,
    MobileMenuComponent,
    AccountMenuComponent,
    NgIconComponent,
    NgClass,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [
    provideIcons({
      matExpandMoreRound,
      matSearchRound,
      matNotificationsOutline,
    }),
  ],
})
export class NavbarComponent {
  showMobileMenu = signal(false);
  showAccountMenu = signal(false);
  showBackground = signal(false);
  TOP_OFFSET = 66;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    if (window.scrollY >= this.TOP_OFFSET) {
      this.showBackground.set(true);
    } else {
      this.showBackground.set(false);
    }
    // do whatever you want here, including manipulations with the window object as it's available here
  }

  toggleMobileMenu() {
    this.showMobileMenu.set(!this.showMobileMenu());
    console.log(this.showMobileMenu());
  }

  toggleAccountMenu() {
    this.showAccountMenu.set(!this.showAccountMenu());
  }
}
