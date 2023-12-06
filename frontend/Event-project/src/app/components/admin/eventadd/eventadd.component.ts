import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';

@Component({
  selector: 'app-eventadd',
  templateUrl: './eventadd.component.html',
  styleUrls: ['./eventadd.component.css']
})
export class EventaddComponent implements OnInit{



  eventform!:FormGroup

  constructor(private toaster:ToastrService,private router:Router,private service:FullserviceService){}

  ngOnInit(): void {
    this.eventform= new FormGroup({
      eventname:new FormControl(''),
      startdate:new FormControl(''),
      enddate:new FormControl(''),
      eventurl:new FormControl(''),
    })
  }

  submit():any{
    let eventdata= this.eventform.getRawValue()
  

    if( !eventdata.eventname || !eventdata.startdate || !eventdata.enddate || !eventdata.eventurl){
      return this.toaster.error("please correct enter data...")
    }
    if(eventdata.startdate>eventdata.enddate){
      return this.toaster.error('please correct enter date...')
    }

    this.service.postevent(eventdata).subscribe((res)=>{
      this.toaster.success('event adding success')
      this.router.navigate(['admin/events'])
    },(err)=>{
      this.toaster.error(err.error.message)
    })
  }

}
