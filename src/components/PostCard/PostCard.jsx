import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./PostCard.css";

const PostCard = ({ post, userName }) => {
  const { cart, dispatch } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const cartItem = cart.find((item) => item.id === post.id);
  const price = 9.99;

  const handleAddToCart = () => {
    setIsAnimating(true);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...post,
        price,
        userName,
      },
    });

    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setIsAnimating(false);
    }, 1500);
  };

  const handleQuantityChange = (action) => {
    setIsAnimating(true);
    dispatch({
      type: action,
      payload: post,
    });
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleRemove = () => {
    setIsAnimating(true);
    dispatch({ type: "REMOVE_FROM_CART", payload: post });
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={`post-card ${isAnimating ? "animate-card" : ""}`}>
      <div className="card-badge">
        <span className="post-id">#{post.id}</span>
        {cartItem && <span className="in-cart-badge">In Cart</span>}
      </div>

      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <p className="post-author">By: {userName}</p>

      <div className="price-section">
        <span className="price">${price}</span>
        {cartItem && (
          <span className="item-total">
            Total: ${(price * cartItem.quantity).toFixed(2)}
          </span>
        )}
      </div>

      <div className="card-actions">
        <Link
          to={`/post/${post.id}`}
          className="view-details-button"
          aria-label={`View details for ${post.title}`}
        >
          View Details
        </Link>

        <div className="cart-section">
          {cartItem ? (
            <div className="cart-controls">
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange("DECREMENT_ITEM")}
                  className="quantity-button"
                  disabled={cartItem.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <span className="button-content">-</span>
                </button>
                <span className="quantity">{cartItem.quantity}</span>
                <button
                  onClick={() => handleQuantityChange("INCREMENT_ITEM")}
                  className="quantity-button"
                  aria-label="Increase quantity"
                >
                  <span className="button-content">+</span>
                </button>
              </div>
              <button
                onClick={handleRemove}
                className="remove-button"
                aria-label="Remove from cart"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`add-to-cart-button ${
                isAnimating ? "button-animate" : ""
              }`}
              disabled={isAnimating}
            >
              <span className="button-content">
                {isAnimating ? "Adding..." : "Add to Cart"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ... feedback message ... */}
    </div>
  );
};

export default PostCard;
