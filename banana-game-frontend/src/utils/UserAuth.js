class UserAuth {
    static isLoggedIn() {
      return Boolean(localStorage.getItem("token"));
    }
  }
  
  export default UserAuth;