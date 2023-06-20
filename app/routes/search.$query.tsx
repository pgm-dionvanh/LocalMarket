import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"

import { Carousel } from 'flowbite-react';
import { useParams } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
    const searchQuery = params.query;
    return searchQuery
}

export async function action({ params }: ActionArgs) {
    const searchQuery = params.query;
}

export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Search` }];

export default function Index() {
    const params = useParams();
    const query = params.query;

  return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
                <h1 className="text-semibold text-2xl">Search results for "{ query }"</h1>
            </main>
        </>
    );
}
