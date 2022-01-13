import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public crudService: CrudService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  deleteUser(id: string) {
    this.crudService.deleteUser(id).subscribe((res) => {
      this.users = this.users.filter((item) => item._id !== id);
      console.log('User deleted successfully!');
    });
  }
}
