import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  searchval=''
  eventdata:any
  newdate!:Date
  status=''
  constructor(private toaster:ToastrService,private router:Router,private service:FullserviceService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.service.geteventuser().subscribe((res)=>{
      this.eventdata=res.data
      console.log(this.eventdata);
      
    },(err)=>{
      this.toaster.error(err.error.message)
    })

    this.newdate=new Date()
  }

  isvideoshow(url:string){
    this.router.navigate(['show'],{queryParams:{url}})
  }


  toastupcoming(){
    this.toaster.error('event coming soon..')
  }

  statusfil(status:string){
      this.status= status
  }


}