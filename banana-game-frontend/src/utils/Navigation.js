class Navigation {
  constructor(navigate) {
    this.navigate = navigate;
  }

  navigateToGame(state) {
    this.navigate("/game", { state }); // Ensure state contains difficulty and startNewGame
  }

  navigateToLogin() {
    this.navigate("/login");
  }

  navigateToProfile(state) {
    this.navigate("/profile", { state });
  }
}

export default Navigation;
