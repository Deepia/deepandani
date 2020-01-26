import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  pageTitle: string;
  error: string;
  uploadError: string;
  categoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Category';
      this.categoryService.getCategoryByID(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            is_active: (res.is_active==true)?'1':'0',
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Category';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
      is_active: ['1'],
    });
  }

  get category_name() { return this.categoryForm.get('category_name');}

  onSubmit () {
    const formData = new FormData();
    formData.append('category_name', this.categoryForm.get('category_name').value);
    formData.append('is_active', this.categoryForm.get('is_active').value);

    const id = this.categoryForm.get('id').value;

    if (id) {
      formData.append('id', id);
      this.categoryService.updateCategory(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/categories']);
          }
        },
        error => this.error = error
      );
    } else {
      this.categoryService.createCategory(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/categories']);
          }
        },
        error => this.error = error
      );
    }
  }

}
