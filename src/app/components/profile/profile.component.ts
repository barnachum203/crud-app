import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  token: string | null | undefined;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken();
    this.currentUser = this.tokenStorage.getUser();
  }
}
