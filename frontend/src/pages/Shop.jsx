import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row ml-14">
        {/* Sidebar */}
        <div className="bg-[#151515] p-4 mt-2 mb-4 md:w-1/4">
          <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
            Filter by Categories
          </h2>
          <div className="space-y-4">
            {categories?.map((category) => (
              <div key={category._id} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, category._id)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-white">
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
            Filter by Brands
          </h2>
          <div className="space-y-4">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  id={brand}
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-white">{brand}</label>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
            Filter by Price
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={priceFilter}
              onChange={handlePriceChange}
              placeholder="Enter Price"
              className="w-full px-3 py-2 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-pink-300"
            />
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 mt-4 text-white bg-pink-500 rounded-lg"
          >
            Reset Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="p-3 md:w-3/4">
          <h2 className="text-center mb-4 text-white">
            {products?.length} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((product) => (
                <ProductCard key={product._id} p={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
