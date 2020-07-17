import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DragdropService } from "../../dragdrop.service";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};
  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress: number = 0;
  listFiles = [];
  addr: String;
  id: String;
  errMsg: String;
  viewed: Array<boolean> = [];

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dragdropService: DragdropService
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(this.id).subscribe((res) => { 
      this.currentUser = res.msg;
      this.addr = res.addr;
      this.listFiles = res.files;
    });
    this.form = this.fb.group({
      avatar: [null]
    })
  }

  ngOnInit() { }

  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj
    })

    this.form.get('avatar').updateValueAndValidity()

    // Upload to server
    this.dragdropService.addFiles(this.form.value.avatar)
    .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.msg = "File uploaded successfully!";
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "";
              this.authService.getUserProfile(this.id).subscribe((res) => {
                this.addr = res.addr;
                this.listFiles = res.files;
              })
            }, 3000);
        }
      })
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}