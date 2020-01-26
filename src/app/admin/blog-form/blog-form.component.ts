import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogpostService } from '../../blogpost/blogpost.service';
import { Category } from '../../blogpost/category';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  postImage: string ='/assets/images/no-image.jpg';
  blogForm: FormGroup;
  fileToUpload: File = null;
  categories: Category;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private blogpostService: BlogpostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.blogpostService.getCategories().subscribe(
      (data: Category) => this.categories = data
    );
    this.postImage ='/assets/images/no-image.jpg';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Blog';
      this.blogService.getBlog(+id).subscribe(
        res => {
          this.blogForm.patchValue({
            title: res.title,
            category_id: res.category_id,
            short_desc: res.short_desc,
            description: res.description,
            is_featured: (res.is_featured==true)?'1':'0',
            is_active: (res.is_active==true)?'1':'0',
            id: res.id
          });
          this.postImage ="http://kanha.deepandani.in/images/"+res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Blog';
      
    }

    this.blogForm = this.fb.group({
      id: [''],
      category_id: ['', Validators.required],
      title: ['', Validators.required],
      short_desc: ['', Validators.required],
      description: ['', Validators.required],
      is_featured: ['0'],
      is_active: ['1'],
      image: [''],
    });
  }

  // onSelectedFile(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.blogForm.get('image').setValue(file);
  //   }
  // }

  handleFileInput(file: FileList)
  {
    this.fileToUpload = file.item(0);
    //show image preview here
    var reader= new FileReader();
    reader.onload = (event: any) =>{
      this.postImage = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  get category_id() { return this.blogForm.get('category_id'); }
  get title() { return this.blogForm.get('title'); }
  get short_desc() { return this.blogForm.get('short_desc'); }
  get description() { return this.blogForm.get('description'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('category_id', this.blogForm.get('category_id').value);
    formData.append('title', this.blogForm.get('title').value);
    formData.append('short_desc', this.blogForm.get('short_desc').value);
    formData.append('description', this.blogForm.get('description').value);
    formData.append('is_featured', this.blogForm.get('is_featured').value);
    formData.append('is_active', this.blogForm.get('is_active').value);
    formData.append('image', this.fileToUpload);

    const id = this.blogForm.get('id').value;

    if (id) {
      formData.append('id', id);
      this.blogService.updateBlog(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/blogs']);
          }
        },
        error => this.error = error
      );
    } else {
      this.blogService.createBlog(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/blogs']);
          }
        },
        error => this.error = error
      );
    }
  }

}
