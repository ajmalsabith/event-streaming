import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(item: any[],value:string):any {

    if(!item || !value){
      return item
    }

    if(value=="all"){
      return item
    }
     return item.filter((item)=>{
      return item.status.includes(value)
     })
  }


}
