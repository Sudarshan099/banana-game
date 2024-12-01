import { useNavigate } from "react-router-dom";

class Navigation {
  constructor(navigate) {
    this.navigate = navigate;
  }

  navigateToGame() {
    this.navigate("/game", { state: { startNewGame: true } });
  }

  navigateToLogin() {
    this.navigate("/login");
  }

  navigateToProfile() {
    this.navigate("/profile", { state: { startNewGame: true } });
  }
}

export default Navigation;
