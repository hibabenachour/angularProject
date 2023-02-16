import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacespace'
})
export class ReplacespacePipe implements PipeTransform {

  transform(ch: any, ...args: any[]): any {
    let element = "";
    for (let i = 0; i < ch.length; i++) {
    
      if(ch[i] == " ") {
        element += "-";
      }else {
      element += ch[i];
    }
    }
    return element;
  }

}
