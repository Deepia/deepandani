import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css']
})
export class PageFormComponent implements OnInit {
  pageTitle: string;
  error: string;
  uploadError: string;
  staticForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Page';
      this.blogService.getStaticPageByID(+id).subscribe(
        res => {
          this.staticForm.patchValue({
            title: res.title,
            slug: res.slug,
            description: res.description,
            is_active: (res.is_active==true)?'1':'0',
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Page';
    }

    this.staticForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      is_active: ['1'],
    });

    
  }

  get title() { return this.staticForm.get('title');}
  get slug() { return this.staticForm.get('slug');}
  get description() { return this.staticForm.get('description');}

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.staticForm.get('title').value);
    formData.append('slug', this.staticForm.get('slug').value);
    formData.append('description', this.staticForm.get('description').value);
    formData.append('is_active', this.staticForm.get('is_active').value);

    const id = this.staticForm.get('id').value;

    if (id) {
      formData.append('id', id);
      this.blogService.updateStaticPage(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/pages']);
          }
        },
        error => this.error = error
      );
    } else {
      this.blogService.createStaticPage(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/pages']);
          }
        },
        error => this.error = error
      );
    }
  }

}
