import React from "react";
import { NavLink } from "react-router-dom";

const HeaderHome = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Quản Lý Sinh Viên
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <NavLink className="dropdown-item" to="/form-sinh-vien">
                Form Sinh Viên
              </NavLink>
              <NavLink className="dropdown-item" to="/table-list-sinh-vien">
                Table list Sinh Viên
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderHome;
