import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container py-[10rem] mt-8">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center">
            Your cart is empty...{" "}
            <Link to="/shop" className="text-pink-500">
              Go To Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Cart Items */}
            <div className="flex-1 lg:w-[60%] mb-8 lg:mb-0">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col lg:flex-row items-start lg:items-center mb-4"
                >
                  <div className="w-[5rem] h-[5rem] mb-4 lg:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-0 lg:ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-pink-500 text-lg"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      ${item.price}
                    </div>
                  </div>

                  <div className="w-full lg:w-24 mt-4 lg:mt-0 ">
                    <select
                      className="p-2 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4 lg:mt-0">
                    <button
                      className="text-red-500"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:w-[35%] w-full lg:ml-8">
              <div className="p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <div className="text-2xl font-bold">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
                <button
                  className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg "
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
