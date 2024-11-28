export class TokenManager {
  static token: string | null = null;

  static init() {
    if (TokenManager.token) {
      return;
    }
    TokenManager.token = localStorage.getItem('token') || null;
  }

  static setToken(token: string) {
    TokenManager.token = token;
    localStorage.setItem('token', token);
  }

  static getToken() {
    return TokenManager.token;
  }

  static clearToken() {
    TokenManager.token = '';
    localStorage.removeItem('token');
  }
  
}