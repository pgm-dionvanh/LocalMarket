import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"

import { Carousel } from 'flowbite-react';
import { useLoaderData, useParams } from "@remix-run/react";
import { getShopByPostCode } from "~/models/shops.server";
import { ShopCard } from "~/components/ui";

export async function loader({ params }: LoaderArgs) {
    const postCode = getShopByPostCode(params.query);
    return postCode
}

export async function action({ params }: ActionArgs) {
    const searchQuery = params.query;
}

export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Search` }];

export default function Index() {
    const params = useParams();
    const query = params.query;
    const data = useLoaderData();

  return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
                <h1 className="text-semibold text-2xl">Search results for "{ query }"</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
                    { data && data.map((shop: Shop) => {return (
                        <ShopCard key={shop.id}  shop={shop}/>
                    )})}
                </div>
            </main>
        </>
    );
}
