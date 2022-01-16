import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { CrudService } from 'src/app/service/crud.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public crudService: CrudService,
    private storageService: TokenStorageService
  ) {}

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.storageService.getUsersList();
    // console.log(this.users);

    if (this.users.length < 1) {
      this.crudService.getAll().subscribe((data: User[]) => {
        this.users = data;
        this.storageService.saveUsersList(data);
      });
    }
  }

  deleteUser(id: string) {
    this.storageService.deleteUser(id);
    this.crudService.deleteUser(id).subscribe((res) => {
      this.users = this.users.filter((item) => item._id !== id);
      console.log('User deleted successfully!');
    });
  }
}
