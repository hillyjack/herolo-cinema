import { PopUpDialogType } from '../enums/PopUpDialogType';
import { Movie } from './Movie';

export interface DialogData {
  dialogType: PopUpDialogType;
  movieInfo?: Movie;
}
