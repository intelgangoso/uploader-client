import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './signup.component';
import { User } from 'src/app/shared/user';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('page should exist', () => {
    expect(component).toBeTruthy();
  });

  it('submitting a form creates a user', () => {
    component.signupForm.controls['name'].setValue("testing");
    component.signupForm.controls['email'].setValue("testing@testing.com");
    component.signupForm.controls['password'].setValue("testing");

    // Trigger the login function
    component.registerUser();
  });
});
