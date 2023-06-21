import type { V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../../components/ui/sidebar/HomeSideBar"



export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Favourites` }];

export default function Index() {
  return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
                <h1 className="text-semibold text-2xl">Favourites</h1>
                Todo
            </main>
        </>
    );
}
