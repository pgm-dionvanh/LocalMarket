import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"

import { Carousel } from 'flowbite-react';
import { useLoaderData, useParams } from "@remix-run/react";
import { getShopByPostCode } from "~/models/shops.server";
import { ShopCard } from "~/components/ui";

export async function loader({ params }: LoaderArgs) {
    const id = getShopByPostCode(params.id);
    return id
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
                todo
            </main>
        </>
    );
}
