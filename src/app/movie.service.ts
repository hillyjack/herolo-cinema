import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './classes/Movie';
import { Observable, of } from 'rxjs';
import { MOVIES } from './data/movies-names';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PopUpDialogComponent } from './pop-up-dialog/pop-up-dialog.component';
import { DialogData } from './classes/DialogData';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private detailsUrl = 'http://www.omdbapi.com/?t=';
  private apiKey = '&apikey=e2c5a642';
  private imgUrl = 'http://img.omdbapi.com/?i=';

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
  }

  getMovies(): Observable<Movie[]> {
    const listOfMovies = [] as Movie[];
    this.getMoviesNamesList().subscribe(moviesNames => {
      moviesNames.forEach(movieName => {
        this.getMovieDetailsByName(movieName).subscribe(movieDetails => {
          listOfMovies.push(this.digestMovieDetails(movieDetails));
        });
      });
    });
    return of(listOfMovies);
  }

  getMoviesNamesList(): Observable<string[]> {
    return of(MOVIES);
  }

  getMovieDetailsByName(movieName: string) {
    return this.http.get(this.detailsUrl + movieName + this.apiKey);
  }

  dialogRefOperations(dataForm: DialogData): Observable<any> {
    const dialogRef: MatDialogRef<PopUpDialogComponent> = this.dialog.open(PopUpDialogComponent, {
      width: '40vw',
      data: dataForm
    });
    return dialogRef.afterClosed();
  }

  private digestMovieDetails(movieDetails): Movie {
    return {
      id: movieDetails.imdbID,
      title: movieDetails.Title,
      genre: movieDetails.Genre,
      director: movieDetails.Director,
      runTime: movieDetails.Runtime,
      year: +movieDetails.Year,
      imgUrl: this.imgUrl + movieDetails.imdbID + this.apiKey,
    };
  }
}
