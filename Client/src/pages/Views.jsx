import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../Styles/view.css";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

function Views() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const products = useSelector((state) => state.productSlice.products);

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    console.log(foundProduct);

    setProduct(foundProduct || null);
  }, [id, products]);

  if (products.length === 0) {
    return <div>Loading products...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="view-main-conatiner">
        <div className="view-container">
          <div className="view-image">
            <div className="image-container">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="image"
              />
            </div>
          </div>
          <div className="view-details">
            <div className="title-view">{product.title}</div>
            <div className="price">
              {" "}
              <span style={{ fontWeight: "600" }}>${product.price} </span>
              <br />
              <span className="mrp"> M.R.P : $</span>{" "}
              <span className="actual-price">
                {Math.floor(
                  product.price / (1 - product.discountPercentage / 100)
                )}
              </span>
              <span className="discount">
                {" "}
                ({product.discountPercentage} % off)
              </span>
            </div>
            <hr className="hr" />
            <div className="description">{product.description}</div>
            <hr className="hr" />
            <div className="category">Category: {product.category}</div>

            <div className="return">ReturnPolicy: {product.returnPolicy}</div>
            <div className="ship">
              ShippingInfo: {product.shippingInformation}
            </div>
            {/* <div className="rating">
              <i
                className="fa-solid fa-star"
                style={{ color: "#FFD43B", display:'float' }}
              ></i>
              <span>{product.rating}</span>
            </div> */}
            <div className="button-container">
              <div
                className="btn btn-fav"
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="btn">Buy Now</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Views;
