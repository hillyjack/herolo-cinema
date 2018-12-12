import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../classes/Movie';
import { PopUpDialogType } from '../enums/PopUpDialogType';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  moviesDetails: Movie[];
  idCounter = 0;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(moviesDetails => this.moviesDetails = moviesDetails);
  }

  addMovie() {
    const emptyMovieObj: Movie = {
      id: 0,
      title: '',
      director: '',
      year: 0,
      runTime: '',
      genre: '',
    };
    this.openPopUpDialog(PopUpDialogType.ADD, emptyMovieObj)
      .subscribe((result) => {
          if (result) {
            result.id = this.idCounter++;
            result.imgUrl = 'https://s18672.pcdn.co/wp-content/uploads/2018/01/Movie.jpg';
            this.moviesDetails.push(result);
          }
        }
      );
  }

  editMovie(movieInfo: Movie) {
    this.openPopUpDialog(PopUpDialogType.EDIT, movieInfo)
      .subscribe((result) => {
        if (result) {
          this.moviesDetails.map(movie => {
            if (movie.id === result.id) {
              movie.title = result.title;
              movie.genre = result.genre;
              movie.director = result.director;
              movie.year = result.year;
              movie.runTime = result.runTime;
            }
          });
        }
      });
  }

  deleteMovie(movieInfo: Movie) {
    this.openPopUpDialog(PopUpDialogType.DELETE, movieInfo)
      .subscribe((result) => {
        if (result) {
          this.moviesDetails = this.moviesDetails.filter(movie => movie.id !== result.id);
        }
      });
  }

  private openPopUpDialog(dialogType: PopUpDialogType, movieInfo: Movie): Observable<any> {
    return this.movieService.dialogRefOperations({ dialogType, movieInfo });
  }
}
