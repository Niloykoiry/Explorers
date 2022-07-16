import React from "react";
import classes from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../images/logo-green-1x.png";
const Footer = () => {
  //Footer Section
  return (
    <footer className={classes.footer}>
      <div className="container text-center">
        <div className={classes["footer-logo"]}>
          <img src={logo} alt="logo" />
          <h3>Explorers</h3>
        </div>
        <ul className={classes["quick-links"]}>
          <li>
            <a href="/"> Home</a>
          </li>
          <li>
            <a href="/"> Tours</a>
          </li>
          <li>
            <a href="/"> Privacy Policy</a>
          </li>
          <li>
            <a href="/"> Terms & Conditions</a>
          </li>
        </ul>
        <ul className={classes["social-icons"]}>
          <li>
            <FaFacebookF />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaInstagram />
          </li>
        </ul>
      </div>
      <p className={classes.copyright}>
        Copyright © 2022 All rights reserved | Created by Niloy Koiry 💖
      </p>
    </footer>
  );
};

export default Footer;
