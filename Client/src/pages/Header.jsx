//import React from 'react'
import { useDispatch } from "react-redux";
import "../Styles/header.css";
import { useState } from "react";
import { productSearch } from "../redux/slices/productSlice";
// import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  // const naviagte = useNavigate()
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
    console.log(searchValue);
    dispatch(productSearch(searchValue));
  };
  return (
    <div>
      <div className="header-container">
        <a href="/" className="brand-name" style={{ textDecoration: "none" }}>
          E-commerce
        </a>

        <div className="search-bar">
          <input
            type="text"
            className="search-bar-text"
            placeholder="Search for Products"
            value={searchValue}
            onChange={(e) => handleSearch(e)}
          />
          <button className="search-bar-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
