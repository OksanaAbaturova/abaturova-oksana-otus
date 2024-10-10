import { NavLink } from "react-router-dom";
import './style.css';
import ButtonBack from "../ButtonBack/ButtonBack";


const NavBar = () => {
  return (
      <nav className="header">
        <ul>
          <li>
            <ButtonBack/>
          </li>
          <li>
            <NavLink
              to={"/task"}
              className={({ isActive }) => {
                return isActive ? " active-route" : "";
              }}
            >
              Задачи
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"user"}
              className={({ isActive }) => {
                return isActive ? "active-route" : "";
              }}
            >
              Пользователи
            </NavLink>
          </li>
        </ul>
      </nav>
    );
};  

export default NavBar;
