import { Injectable } from '@angular/core';
import { User } from '../model/User';

const TOKEN_KEY = 'x-auth-token';
const USER_KEY = 'auth-user';
const USER_LIST = 'user-list';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public deleteUser(id: string): void {
    let users: User[] = this.getUsersList();
    let index = users.findIndex((user) => user._id == id);
    if (users[index]._id == this.getUser()!._id) {
      this.signOut();
    }

    if (index > -1) {
      users.splice(index, 1);
    }

    this.saveUsersList(users);
  }

  public saveUsersList(users: User[]): void {
    window.sessionStorage.removeItem(USER_LIST);
    window.sessionStorage.setItem(USER_LIST, JSON.stringify(users));
  }

  public getUsersList(): User[] {
    const users = window.sessionStorage.getItem(USER_LIST);
    if (users) {
      return JSON.parse(users);
    }
    return [];
  }

  getUserById(id: string): User {
    return this.getUsersList().find((user) => user._id == id)!;
  }

  updateUserById(id: string, userToUpdate: User): void {
    let users: User[] = this.getUsersList();
    let index = users.findIndex((user) => user._id == id);
    if (users[index]._id == this.getUser()!._id) {
      this.saveUser(userToUpdate);
    }
    users[index] = userToUpdate;
    this.saveUsersList(users);
  }
}
