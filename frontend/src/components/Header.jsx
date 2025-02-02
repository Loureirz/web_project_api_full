import logo from '../images/logo.svg'
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Header({ loggedIn, userEmail, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignInPage = location.pathname === "/signup";
  const isSignUpPage = location.pathname === "/signin";

  const signOut = () => {
    handleLogout();
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  const RenderMenuItems = () => {
    if (isSignInPage) {
      return (
        <NavLink
          className={({ isActive }) => 
          isActive ? 'header__item header__item_active' : 'header__item'}
          to="/signin"
        >
          Entrar
        </NavLink>
      );
    } else if (isSignUpPage) {
      return (
        <NavLink
        className={({ isActive }) => 
          isActive ? 'header__item header__item_active' : 'header__item'
        }
          to="/signup"
        >
          Registrar-se
        </NavLink>
      );
    } else if (loggedIn) {
      return (
        <>
          <span className="header__item">{userEmail}</span>
          <button onClick={signOut} className="header__button">
            Sair
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <header className="header">
        <div className="header__logo">
      <img
        className="header__logo-image"
        src={logo}
        alt="Logo da página Around the us"
      />
      <nav className="menu">
        <RenderMenuItems />
      </nav>
      </div>
    </header>
  );
}

export default Header;