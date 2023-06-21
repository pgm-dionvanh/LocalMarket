import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { useLoaderData, useParams } from "@remix-run/react";
import { getShopByPostCode } from "~/models/shops.server";
import { ShopCard } from "~/components/ui";
import { RemixPagination } from '@ignisda/remix-pagination';

export async function loader({ params, request }: LoaderArgs) {
    const url = new URL(request.url);
    const offset = (parseInt(url.searchParams.get('page') || '1') - 1) * 10;
    const postCode = await getShopByPostCode(params.query, offset);
    return { shops: postCode.data, count: postCode.pagination.total}
}


export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Search` }];

export default function Index() {
    const params = useParams();
    const query = params.query;
    const { shops, count } = useLoaderData();

  return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
                <h1 className="text-semibold text-2xl">Search results for "{ query }"</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
                    { shops && shops.map((shop: Shop) => {return (
                        <ShopCard key={shop.id}  shop={shop}/>
                    )})}
                </div>
                <div className="flex items-center justify-center mt-12">
                    <RemixPagination total={count || 0} size={20} classPrefix="lc" />
                </div>
            </main>
        </>
    );
}
