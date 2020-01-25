import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact';
import { CmspageService } from '../cmspage.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  submitted = false;
  model = new Contact();
  error: {errorTitle:'',errorDesc:''};
  regForm: FormGroup;
  constructor(private router: Router,private formbuilder: FormBuilder, private cmspageService: CmspageService) { }

  ngOnInit() {
    this.setFormState();
  }
  setFormState(): void {
    this.regForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }
  onSubmit() {
    
    let contactdetails = this.regForm.value;
    this.submitted = true;
    return this.cmspageService.contactForm(contactdetails).subscribe(
      data => this.model = data,
      error => this.error = error
    );
    this.regForm.reset();
  }
  gotoHome() {
    this.router.navigate(['/']);
  }

}
