import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold pl-24 md:ml-8 lg:ml-16 mt-8">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
