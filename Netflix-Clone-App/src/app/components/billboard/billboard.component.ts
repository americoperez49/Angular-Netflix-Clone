import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Tables } from '../../../types/supabase';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matInfoOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css',
  providers: [
    provideIcons({
      matInfoOutline,
    }),
  ],
})
export class BillboardComponent {
  billboardMovie: Tables<'movies'> | null | undefined;
  constructor(private supabaseService: SupabaseService) {}
  async ngOnInit(): Promise<void> {
    this.billboardMovie = await this.supabaseService.getBillboardMovie();
    console.log(this.billboardMovie);
  }
}
