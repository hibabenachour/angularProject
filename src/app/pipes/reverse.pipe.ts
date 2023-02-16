import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
 
  transform(ch: any, ...args: any[]): any {
    let element = "";
    //solution one
    // for (let i = ch.length -1 ; i >= 0; i--) {
    //    element += ch[i];
      
    // }
    //solution two
    for (let i = 0; i < ch.length; i++) {
     element = ch[i]+ element ;
      
    }
    return element;
  }

}
