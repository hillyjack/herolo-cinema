import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../classes/DialogData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PopUpDialogType } from '../enums/PopUpDialogType';
import { Movie } from '../classes/Movie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexValidations } from '../enums/RegexValidations';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.css']
})
export class PopUpDialogComponent implements OnInit {
  dialogType: PopUpDialogType;
  movieInfo: Movie;
  movieDetailsForm: FormGroup;
  PopUpDialogType: typeof PopUpDialogType = PopUpDialogType;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PopUpDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.initDialogData(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onActionClick(): void {
    if (this.dialogType === PopUpDialogType.DELETE) {
      this.dialogRef.close( this.movieInfo);
    } else {
      const dataForm = this.movieDetailsForm.getRawValue();
      const updatedInfo: Movie = {
        id: this.movieInfo.id,
        title: dataForm.title,
        genre: dataForm.genre,
        director: dataForm.director,
        year: dataForm.year,
        runTime: dataForm.runTime,
      };
      this.dialogRef.close(updatedInfo);
    }
  }

  private initDialogData(data: DialogData) {
    this.dialogType = data.dialogType;
    this.movieInfo = data.movieInfo;
    const runTime = this.movieInfo.runTime.split(' ')[0];
    this.movieDetailsForm = this.formBuilder.group({
      title: [this.movieInfo.title || '', [ Validators.required ]],
      genre: [this.movieInfo.genre || '', [ Validators.required ]],
      director: [this.movieInfo.director || '', [ Validators.required ]],
      year: [this.movieInfo.year || 1900, [ Validators.required, Validators.pattern(RegexValidations.YEAR)]],
      runTime: [ runTime || 0, [ Validators.required,  Validators.pattern(RegexValidations.RUNTIME) ]],
    });
  }
}
