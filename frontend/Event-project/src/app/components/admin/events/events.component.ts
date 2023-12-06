import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  searchtext=''
  eventdata:any
  constructor(private toaster:ToastrService,private router:Router,private service:FullserviceService){}

  ngOnInit(): void {
    this.service.getevent().subscribe((res)=>{
      this.eventdata=res.data
    },(err)=>{
      this.toaster.error(err.error.message)
    })
  }
  edit(id:string){
    this.router.navigate(['admin/eventedit'],{queryParams:{id}})
  }

  delete(id:string){
    this.service.eventdelete(id).subscribe((res)=>{
      this.ngOnInit()
    },(err)=>{
      this.toaster.error('wrong...')
    })
  }

  addevent(){

    this.router.navigate(['admin/eventadd'])

  }

}
