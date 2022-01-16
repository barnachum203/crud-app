import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { CrudService } from 'src/app/service/crud.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id: string = '';
  user!: User;

  constructor(
    public crudService: CrudService,
    private storageService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['profileId'];
    this.user = this.storageService.getUserById(this.id.toString());
    if (!this.user) {      
      this.crudService.getUser(this.id).subscribe((data: User) => {
        this.user = data;
      });
    }
  }
}
