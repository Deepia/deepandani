import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { BlogpostService } from '../../blogpost/blogpost.service';
import { Category } from '../../blogpost/category';
@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {

  title = 'Manage Blogs';
  blogs: Blog;
  error: string;
  categories: Category;
  constructor(private blogService: BlogService, private blogpostService: BlogpostService) { }

  ngOnInit() {
    this.blogpostService.getCategories().subscribe(
      (data: Category) => this.categories = data
    );

    this.bindBlogs();
    
  }
  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.blogService.deleteBlog(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  bindBlogs(categoryid?: number)
  {
    console.log('categoryid: '+categoryid);
    this.blogService.getBlogs(categoryid).subscribe(
      (data: Blog) => this.blogs = data,
      error => this.error = error
    );
  }

  onChange(event){
    console.log('selectedTown: ', event.target.value);
    this.bindBlogs(+event.target.value);
    
  }

}
