import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  productCategory,
  productSort,
} from "../redux/slices/productSlice";
import "../Styles/home.css";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.productSlice
  );
  const wishlist = useSelector((state) => state.wishlistSlice.wishlist);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [showWishlist, setShowWishlist] = useState(false);

  const itemsPerPage = 14;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage;

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    setSort("Default");
    setCurrentPage(1);
    dispatch(productCategory(value));
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    dispatch(productSort(value));
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleWishlistToggle = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleShowWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const style = {
    height: "1.7rem",
    borderRadius: "6px",
    border: "transparent",
    fontFamily: "Pridi, serif",
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="filter-container">
        <div style={{ marginRight: ".5rem", fontSize: "14px" }}>Category</div>
        <div>
          <select
            name="category"
            id="category"
            onChange={handleCategory}
            value={category}
            style={style}
          >
            <option value="all">All</option>
            <option value="beauty">Beauty</option>
            <option value="groceries">Groceries</option>
            <option value="furniture">Furniture</option>
            <option value="fragrances">Fragrances</option>
          </select>
        </div>
        <div
          style={{
            marginRight: ".5rem",
            marginLeft: "0.5rem",
            fontSize: "14px",
          }}
        >
          Sort
        </div>
        <div>
          <select
            name="sort"
            id="sort"
            onChange={handleSort}
            value={sort}
            className="sort"
            style={style}
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Low Price to High</option>
            <option value="priceHighToLow">High Price to Low</option>
            <option value="rateLowToHigh">Low Rating To High</option>
            <option value="rateHighToLow">High Rating to Low</option>
          </select>
        </div>

        <button
          onClick={handleShowWishlist}
          className={`wishlist-toggle-button ${
            showWishlist ? "inWishlist" : "outWishlist"
          }`}
        >
          {showWishlist
            ? "Show Products"
            : `Show Wishlist (${wishlist.length})`}
        </button>
      </div>

      {/* Wishlist Display */}
      {showWishlist ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          
        >
          <h2 style={{ color: "Black", textDecoration: "underline" }}>
            Wishlist
          </h2>
          <div className="all-product-container" style={{display:'flex', flexWrap:'wrap'}}> 
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="image">
                    <img
                      src={product.images[0] || "../../Images/ZKZg.gif"}
                      alt=""
                      className="product-image"
                      onClick={() => handleView(product.id)}
                    />
                  </div>
                  <div className="details">
                    <div className="title-rate">
                      <div className="title">{product.title}</div>
                      <div className="rate">${product.price}</div>
                    </div>
                    <div className="rate-button">
                      <div className="rating">
                        <i
                          className="fa-solid fa-star"
                          style={{ color: "#FFFFFF", margin: "0.2rem" }}
                        ></i>
                        <span>{product.rating}</span>
                      </div>
                      <div
                        className={`button button-fav ${
                          wishlist.some((item) => item.id === product.id)
                            ? "in-wishlist"
                            : ""
                        }`}
                        onClick={() => handleWishlistToggle(product)}
                      >
                        <i
                          className={`fa-solid ${
                            wishlist.some((item) => item.id === product.id)
                              ? "fa-heart-circle-xmark"
                              : "fa-heart"
                          }`}
                        ></i>
                      </div>
                      <div className="button">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </div>
                    </div>
                    <div className="warranty">
                      *{" "}
                      {product.warrantyInformation || "No warranty information"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleShowWishlist()}
              >
                No WisList Items Please add
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="all-product-container">
          {products.length > 0 ? (
            products.slice(startItem, endItem).map((product) => (
              <div className="product-card" key={product.id}>
                <div className="image">
                  <img
                    src={product.images[0] || "../../Images/ZKZg.gif"}
                    alt=""
                    className="product-image"
                    onClick={() => handleView(product.id)}
                  />
                </div>
                <div className="details">
                  <div className="title-rate">
                    <div className="title">{product.title}</div>
                  </div>
                  <hr />
                  <div className="second-main">
                    <div className="rating">
                      <i
                        className="fa-solid fa-star"
                      ></i>
                      <span>{product.rating}</span>
                    </div>
                    <div className="rate">
                      <div className="offer-container">
                        <span className="home-discount">
                          {" "}
                          {product.discountPercentage} % off
                        </span>
                        <span className="home-actual-price">
                          {Math.floor(
                            product.price / (1 - product.discountPercentage / 100)
                          )}
                        </span>
                      </div>
                      <span style={{ fontWeight: "600" }}>${product.price} </span>
                      <br />
                    </div>
                  </div>
                  <hr />
                  <div className="rate-button">
                    <div className="warranty">
                      * {product.warrantyInformation || "No warranty information"}
                    </div>
                    <div
                      className={`button button-fav ${
                        wishlist.some((item) => item.id === product.id)
                          ? "in-wishlist"
                          : ""
                      }`}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <i
                        className={`fa-solid ${
                          wishlist.some((item) => item.id === product.id)
                            ? "fa-heart-circle-xmark"
                            : "fa-heart"
                        }`}
                      ></i>
                    </div>
                    <div className="button">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="../../Images/ZKZg.gif"
                alt=""
                style={{ width: "50px" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!showWishlist && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={index + 1 === currentPage ? "pageActive" : "page"}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
