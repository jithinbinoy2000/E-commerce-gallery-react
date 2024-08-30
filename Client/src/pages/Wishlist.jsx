import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access wishlist from Redux store
  const wishlist = useSelector((state) => state.wishlistSlice.wishlist);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage;

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

  return (
    <div className="container">
      <div className="all-product-container">
        {wishlist.length > 0 ? (
          wishlist.slice(startItem, endItem).map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image">
                <img
                  src={product.images[0] || "../../Images/ZKZg.gif"}
                  alt={product.title}
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
                      style={{ color: "#FFD43B", margin: "0.2rem" }}
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
                  * {product.warrantyInformation || "No warranty information"}
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
              alt="No items"
              style={{ width: "50px" }}
            />
          </div>
        )}
      </div>

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
    </div>
  );
}

export default Wishlist;
