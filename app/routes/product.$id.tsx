import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"

import { Carousel } from 'flowbite-react';
import { Form, useLoaderData, useParams } from "@remix-run/react";
import { getShopByPostCode } from "~/models/shops.server";
import { ShopCard } from "~/components/ui";
import { getProductById } from "~/models/products.server";
import { useCart } from "react-use-cart";
import { createReviewForShop } from "~/models/reviews.server";

export async function loader({ params }: LoaderArgs) {
    const id = getProductById(params?.id);
    return id
}

export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Search` }];

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();

    const addReview = createReviewForShop({
        name: formData.get("name"),
        text: formData.get("description"),
        rating: 5,
        productId: formData.get("productid"),
    })
    return {}
}

export default function Index() {
    const params = useParams();
    const query = params.query;
    const data = useLoaderData();
    const { addItem } = useCart();


  return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
            <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="grid grid-cols-1 gap-y-12 lg:gap-24 lg:grid-cols-2">
                            <div className="space-y-6 lg:col-span-2">
                                <h1 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-black">{ data.name }</h1>
                                <p className="text-lg text-gray-800">
                                    { data.description }
                                </p>
                                <div className="rounded-xl overflow-hidden relative h-80 bg-blue-100 flex justify-center items-center p-4">
                                    <img className="object-cover cover max-w-md" src={data.image} alt={data.name} />
                                </div>
                                <button onClick={() => addItem({ id: data.id, price: data.price, name: data.name, image: data.image, description: data.image, key: data.name })} className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full" type="submit">Add to cart</button>

                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                            <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="border-b-2  p-4 text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">Add review</h2>
                                <div className="p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                                    <Form method="post" encType="multipart/form-data">
                                        <div className="flex flex-col gap-4">
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="name">Name</label>
                                                <input type="text" id="name" name="name" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />
                                            </div>
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="description">Description</label>
                                                <input type="text" id="description" name="description" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />
                                                <input type="hidden" id="productid" name="productid" value={data.id} className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />

                                            </div>
                                           
                                        </div>
                                        <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full" type="submit">Create</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
