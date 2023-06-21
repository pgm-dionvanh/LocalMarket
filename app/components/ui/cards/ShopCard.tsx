import { Heart, GitHub } from "react-feather";
import { Link } from "@remix-run/react";
import Shop from "~/interfaces/shop.interface.ts";
export default function ShopCard({ shop }: Shop) {
    const addFavourites = (shopBody: Shop) => {
        const favourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) as unknown as [] : [];
        favourites.push({ ...shopBody });

        localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    return (
        <div key={shop.id} className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
            <div>
            <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
            <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                <Heart onClick={() => addFavourites(shop)} className="hover:fill-red-500 hover:text-red-500"/>
            </div>
            </div>

            <div className="relative block h-full">
            <div className="h-48 flex justify-center items-center bg-gray-100 rounded-lg">
                <img className="h-32" src={shop.image} alt="" />
            </div>
            </div>
            </div>

            <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                { shop.name }
            </h2>

            <p className="mt-2 text-gray-800 text-sm">{ shop.description }</p>
            <Link to={`/shop/${shop.id}`}>
            <button  className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
                View shop
            </button>
            </Link>
        </div>
    );
}