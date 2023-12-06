import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit{


  newid='null'
  eventform!:FormGroup
  id:string=''
  editdata:any
  name=''
  url=''
  start!:Date
  end!:Date
  statuss=''

  constructor(private toaster:ToastrService,private router:Router,private service:FullserviceService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.service.eventeditget(this.id).subscribe((res)=>{
      this.editdata=res.data
      this.name=res.data.name
      this.url=res.data.eventurl
      this.start=res.data.startdate
      this.end=res.data.enddate
      this.statuss=res.data.status
      
    },(err)=>{
      this.toaster.error(err.error.message)
    })
    this.eventform= new FormGroup({
      eventname:new FormControl(''),
      startdate:new FormControl(''),
      enddate:new FormControl(''),
      eventurl:new FormControl('')
    })
  }

  submit():any{
    let eventdata= this.eventform.getRawValue()
    eventdata.ogid=this.id
    eventdata.status=this.newid
    
    eventdata.status=this.newid

    if( !eventdata.status||!eventdata.eventname || !eventdata.startdate || !eventdata.enddate || !eventdata.eventurl){
      return this.toaster.error("please correct enter data...")
    }
    if(eventdata.startdate>eventdata.enddate){
      return this.toaster.error('please correct enter date...')
    }

    this.service.posteditevent(eventdata).subscribe((res)=>{
      this.toaster.success(res.message)
      this.router.navigate(['admin/events'])
    },(err)=>{
      this.toaster.error(err.error.message)
    })
  }

}