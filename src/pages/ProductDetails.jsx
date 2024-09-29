import React, { useEffect } from "react";
import { StarRating } from "../components";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../utils/utils";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  addProductToCart,
  addProductToWishlist,
  fetchProductById,
  removeProductFromWishlist,
} from "../store/productsSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { product, userData } = useSelector((state) => ({
    product: state.products.allProducts.find((p) => p._id === productId),
    userData: state.user.userData,
  }));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId)); // Fetch product if not already in state
    }
  }, [product, productId, dispatch]);

  const handleAddToCart = () => {
    if (!userData) {
      navigate("/login", { state: { from: location.pathname } });
      notify("warn", "Please Login to continue");
    } else {
      if (!product?.inCart) {
        dispatch(addProductToCart(product));
      } else {
        navigate("/cart");
      }
    }
  };

  const handleWishlistToggle = () => {
    if (!userData) {
      navigate("/login", { state: { from: location.pathname } });
      notify("warn", "Please Login to continue");
    } else {
      if (product?.inWish) {
        dispatch(removeProductFromWishlist(product._id));
      } else {
        dispatch(addProductToWishlist(product));
      }
    }
  };

  return (
    <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
      <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10">
        <section className="relative p-7 bg-black/[0.075] flex items-center justify-center rounded-lg">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full object-contain max-w-xs"
          />
        </section>

        <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl font-bold">{product?.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {product?.description}
            </p>
            <div className="flex items-center gap-1">
              <StarRating />
              <span className="text-xs text-gray-400">
                ({product?.rating}) Rating
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">About Product</h2>
            <ul className="flex gap-5">
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Brand: </span>
                  {product?.brand}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Category: </span>
                  {product?.category}
                </li>
              </div>
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Gender: </span>
                  {product?.gender}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Weight: </span>
                  {product?.weight}
                </li>
              </div>
            </ul>
          </div>

          <div className="flex gap-2 items-center pb-10 sm:pb-0">
            Price:
            <span className="ms-1 text-xl sm:text-2xl text-amber-600">
              ₹{product?.newPrice}
            </span>
            <span className="text-sm text-gray-600 line-through">
              ₹{product?.price}
            </span>
          </div>

          <div className="w-full flex gap-4 items-center flex-wrap">
            <button
              className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              onClick={handleAddToCart}
            >
              <HiOutlineShoppingBag />
              {product?.inCart ? "Go to Bag" : "Add to Bag"}
            </button>

            <button
              className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              onClick={handleWishlistToggle}
            >
              {product?.inWish ? (
                <>
                  <BsFillBookmarkHeartFill />
                  <span>Remove from Wishlist</span>
                </>
              ) : (
                <>
                  <BsBookmarkHeart />
                  <span>Add to Wishlist</span>
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
