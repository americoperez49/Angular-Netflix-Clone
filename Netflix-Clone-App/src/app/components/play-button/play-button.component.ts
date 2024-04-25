import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matPlayArrow } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css',
  providers: [
    provideIcons({
      matPlayArrow,
    }),
  ],
})
export class PlayButtonComponent {
  @Input({ required: true }) movieId!: number;
  constructor(private route: ActivatedRoute) {}
}
