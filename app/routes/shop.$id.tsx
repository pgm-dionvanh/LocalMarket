import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { useParams } from "@remix-run/react";
import { getShopById } from "~/models/shops.server";
import { ItemCard } from "~/components/ui";
import {  useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
    const shop = getShopById(params.id);
    return shop;
}




export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Search` }];

export default function Index() {
    const data: Shop = useLoaderData();

    if(!data) return <div>Shop not found</div>
  return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48">
                <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="grid grid-cols-1 gap-y-12 lg:gap-24 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-black">{ data.name }</h1>
                                <p className="text-lg text-gray-800">
                                    { data.description }
                                </p>
                                <div className="rounded-xl overflow-hidden relative h-80 bg-blue-100 flex justify-center items-center p-4">
                                    <img className="object-cover cover max-w-md" src={data.image} alt={data.name} />
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-6">
                                    <article className="flex space-x-6 items-start">
                                        <div className="bg-yellow-400 rounded-xl inline-block p-4">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" color="black" height="32" width="32" xmlns="http://www.w3.org/2000/svg" className="text-black"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl text-black">Lorem</h3>
                                            <p className="text-base text-gray-800">Lorem</p>
                                        </div>
                                    </article>
                                    <article className="flex space-x-6 items-start">
                                        <div className="bg-yellow-400 rounded-xl inline-block p-4">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" color="black" height="32" width="32" xmlns="http://www.w3.org/2000/svg" className="text-black"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl text-black">Lorem</h3>
                                            <p className="text-base text-gray-800">Lorem</p>
                                        </div>
                                    </article>
                                    <article className="flex space-x-6 items-start">
                                        <div className="bg-yellow-400 rounded-xl inline-block p-4">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" color="black" height="32" width="32" xmlns="http://www.w3.org/2000/svg" className="text-black"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl text-black">Lorem</h3>
                                            <p className="text-base text-gray-800">Lorem</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">Products</h2>
                            </div>
                            <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
                                <ItemCard/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">Reviews</h2>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
