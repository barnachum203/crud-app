import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { CrudService } from 'src/app/service/crud.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number = 0;
  user!: User;
  form: FormGroup;

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: TokenStorageService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      first_name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['profileId'];
    this.user = this.storageService.getUserById(this.id.toString());
    if (!this.user) {
      this.crudService.getUser(this.id.toString()).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.user.email = this.f.email.value;
    this.user.first_name = this.f.first_name.value;
    this.storageService.updateUserById(this.id.toString(), this.user);
    this.crudService
      .updateUser(this.id.toString(), this.user)
      .subscribe((res) => {
        console.log('User updated successfully!');
      });
    this.router.navigateByUrl('home');
  }
}
