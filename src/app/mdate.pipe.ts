import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'mdate'
})
export class MdatePipe implements PipeTransform {

  transform(value: Date, format?: string): any {
    if (typeof value === "undefined" || value == null || !value) {
      return "";
    }
    return moment(value).format(format || 'YYYY-MM-DD HH:mm');
  }

}
