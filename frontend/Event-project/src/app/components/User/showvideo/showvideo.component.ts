import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullserviceService } from 'src/app/service/fullservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-showvideo',
  templateUrl: './showvideo.component.html',
  styleUrls: ['./showvideo.component.css']
})
export class ShowvideoComponent implements OnInit {
  [x: string]: any;

  constructor(private toaster:ToastrService,private router:Router,private service:FullserviceService,private route:ActivatedRoute,private sanitizer: DomSanitizer
    ){}
    videoId = '';
    videoUrl: SafeResourceUrl = '';
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.videoId = params['url'];
      console.log(this.videoId);
      if (this.videoId) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
      } else {
        console.error('Video ID is empty or undefined.');
      }
    });
  }





}
