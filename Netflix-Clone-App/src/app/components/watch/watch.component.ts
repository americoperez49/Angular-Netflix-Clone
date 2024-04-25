import {
  Component,
  WritableSignal,
  signal,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matArrowBackOutline } from '@ng-icons/material-icons/outline';
@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
  providers: [
    provideIcons({
      matArrowBackOutline,
    }),
  ],
})
export class WatchComponent {
  @ViewChild('myVideo') myVideo!: ElementRef;

  movieURL: WritableSignal<string> = signal('');
  movieName: WritableSignal<string | null> = signal('');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
  ) {
    this.route.params.subscribe(async (params) => {
      const urlLink = await this.supabaseService.getLinkToWatchMovie(
        params['id'],
      );
      this.movieURL.set(urlLink);
      console.log(this.movieURL());
      if (this.supabaseService.allMovies().length > 0) {
        this.supabaseService.allMovies().filter((movie) => {
          if (movie.id == params['id']) {
            this.movieName.set(movie.title);
          }
        });
      } else {
        await this.supabaseService.getAllMovies();
        this.supabaseService.allMovies().filter((movie) => {
          if (movie.id == params['id']) {
            this.movieName.set(movie.title);
          }
        });
      }
    });
  }

  // ngAfterViewInit() {
  //   let videoElement = this.myVideo.nativeElement;

  //   const videoTime = localStorage.getItem('videoTime' + this.movieName());

  //   if (videoTime) {
  //     videoElement.currentTime = videoTime;
  //   }

  //   // setInterval(() => {
  //   //   localStorage.setItem(
  //   //     'videoTime' + this.movieName(),
  //   //     videoElement.currentTime,
  //   //   );
  //   // }, 1000);
  // }

  // ngOnDestroy() {
  //   console.log('destroyed');
  // }
}
