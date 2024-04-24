import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css',
})
export class MobileMenuComponent {
  @Input({ required: true }) visible = signal(false);
}
