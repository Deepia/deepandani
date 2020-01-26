import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import{Category} from '../../models/category';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  title = 'Category';
  categories: Category;
  error: {errorTitle:'',errorDesc:''};
  constructor(
    private titleService: Title,
    
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.categoryService.getCategories().subscribe(
      (data: Category) => this.categories = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.categoryService.deleteCategory(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

}
