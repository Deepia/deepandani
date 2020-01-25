import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Pages } from '../../models/pages';
@Component({
  selector: 'app-manage-pages',
  templateUrl: './manage-pages.component.html',
  styleUrls: ['./manage-pages.component.css']
})
export class ManagePagesComponent implements OnInit {
  title = 'Manage Page';
  pages: Pages;
  error: string;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getAllStaticPage().subscribe(
      (data: Pages) => this.pages = data,
      error => this.error = error
    );
  }
  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.blogService.deleteStaticPage(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  

}
