import { Component, Signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Tables } from '../../../types/supabase';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matInfoOutline } from '@ng-icons/material-icons/outline';
import { PlayButtonComponent } from '../play-button/play-button.component';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [NgIconComponent, PlayButtonComponent],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css',
  providers: [
    provideIcons({
      matInfoOutline,
    }),
  ],
})
export class BillboardComponent {
  billboardMovie: Signal<Tables<'movies'> | null | undefined> =
    this.supabaseService.billboardMovie;
  constructor(private supabaseService: SupabaseService) {}
  async ngOnInit(): Promise<void> {
    await this.supabaseService.getBillboardMovie();
  }

  getMovieId(): number {
    return this.billboardMovie()!.id;
  }
}
