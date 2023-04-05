import React from 'react';
import Logo from '../assets/images/logo.svg';
import Search from '../assets/images/search.svg';
import Store from '../assets/images/store.svg';
const Nav = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li>
            <img src={Logo} alt="logo" />
          </li>
          <li>
            <a className="link-styled" href="">
              Store
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Mac
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Ipad
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              IPhone
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Watch
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Airpords
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Tv & Home
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Entertainment
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Accessories
            </a>
          </li>
          <li>
            <a className="link-styled" href="">
              Support
            </a>
          </li>
          <li>
            <img src={Search} alt="search" />
          </li>
          <li>
            <img src={Store} alt="store" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
