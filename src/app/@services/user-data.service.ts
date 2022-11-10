import { Injectable } from '@angular/core';
import { JWT_TOKEN, REFRESH_TOKEN, USER } from '@models/constants';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  setToken(token: string) {
    localStorage.setItem(JWT_TOKEN, token);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  setUser(user: string) {
    localStorage.setItem(USER, user);
  }

  getToken() {
    localStorage.getItem(JWT_TOKEN);
  }

  getUser() {
    localStorage.getItem(USER);
  }
}
