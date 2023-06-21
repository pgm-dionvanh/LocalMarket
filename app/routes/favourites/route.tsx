import type { V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../../components/ui/sidebar/HomeSideBar"
import ShopCard from "~/components/ui/cards/ShopCard";
import { useEffect } from "react";



export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Favourites` }];

export default function Index() {

    let favourites = localStorage.getItem("favourites") && typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("favourites")) as unknown as [] : [];

     return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
                <h1 className="text-semibold text-2xl">Favourites</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
                { favourites && favourites.map((shop: Shop) => {return (
                        <ShopCard key={shop.id}  shop={shop}/>
                    )})}
                </div>
            </main>
        </>
    );
}
