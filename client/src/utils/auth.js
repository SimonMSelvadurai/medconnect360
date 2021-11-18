import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  getRole() {
    const userRole = localStorage.getItem('user_role');
    console.log("userRole", userRole);
    return userRole;
  }

  isRole(roleName) {
    return localStorage.getItem('user_role').toLowerCase() === roleName.toLowerCase();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  getUserId() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('user_id');
  }

  login(idToken, roleName, userId) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_role', roleName);
    localStorage.setItem('user_id', userId);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
