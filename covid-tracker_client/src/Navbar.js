import { useState } from "react";

const Navbar = () => {

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Covid Traker
        </a>

        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          Filter by Date
        </button> */}

        {/* <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <br />

            <li className="nav-item">
              <label for="from" className="text-white">
                From&nbsp;
              </label>
              <input type="date" id="date" name="birthday" />
            </li>

            <br />

            <li className="nav-item">
              <label for="to" className="text-white">
                To &nbsp;&nbsp;&nbsp; &nbsp;
              </label>
              <input type="date" id="date" name="birthday" />
            </li>
          </ul>

          <br />

          <button class="btn btn-outline-success" type="submit">Search</button>

        </div> */}

      </div >

    </nav >
  );
};

export default Navbar;
