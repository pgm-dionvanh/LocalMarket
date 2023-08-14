import { ActionFunction, json, redirect, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { createProduct, getProductsByShopId } from "~/models/products.server";
import { useUser } from "~/utils";
import { requireUserId } from "~/session.server"

import { Form, useLoaderData, useParams } from "@remix-run/react";
import { AdminNav, HomeSideBar, AdminItemCard } from "~/components/ui";
import { getShopById } from "~/models/shops.server";
import { 
    unstable_composeUploadHandlers as composeUploadHandlers,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { uploadImage } from "~/utils/cloudinary";
import { Products } from "@prisma/client";

export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Dashboard` }];

export const loader = async ({ request, params }: LoaderArgs) => {
    const userId = await requireUserId(request);
    const shop = await getShopById(params.id)
    const products = await getProductsByShopId(params.id);
    return { shop: shop, products: products };
};

export const action: ActionFunction = async ({ request }) => {
    const uploadHandler = composeUploadHandlers(
        async ({ name, data }) => {
            if (name !== "upload") {
                return undefined
            }
            const uploadedImage: any = await uploadImage(data)
            return uploadedImage.secure_url;
        },
        createMemoryUploadHandler()
    );

    const formData = await parseMultipartFormData(request, uploadHandler);
    const file = formData.get('upload')

    createProduct({
            name: formData.get('name'),
            description: formData.get('description'),
            price: formData.get('price'),
            image: file,
            shopId: formData.get('shopid')
        
    })
    return redirect(`/shop/${formData.get('shopid')}`);
};

export default function Index() {
    const user = useUser();
    const { shop, products } = useLoaderData();

    return (
    <>
        <HomeSideBar/>
        <AdminNav/>
            <main className="px-4 md:px-48 mt-12">
            <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="border-b-2  p-4 text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">Create Product</h2>
                                <div className="p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                                    <Form method="post" encType="multipart/form-data">
                                        <div className="flex flex-col gap-4">
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="name">Product name</label>
                                                <input type="text" id="name" name="name" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />
                                            </div>
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="description">Product description</label>
                                                <input type="text" id="description" name="description" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />
                                            </div>
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="description">Product price</label>
                                                <input type="number" id="price" min="1" step="any" name="price" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />
                                            </div>
                                            <input type="hidden" id="shopid" name="shopid" value={shop.id} className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autoComplete="off" />


                                            <div className="pt-0 flex flex-col">
                                                <label className="mb-4 text-gray-600 text-lg font-light" htmlFor="upload">Logo</label>
                                                <label htmlFor="upload" className="flex flex-col items-center justify-center border-4 border-gray-300 border-dashed rounded h-36 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300 cursor-pointer">
                                                    <svg className="w-8 h-8 text-gray-600
                                                    " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                                                    <span className="mt-2 text-base leading-normal text-blue-500 font-bold">Selecteer afbeelding</span>
                                                    <input type="file" name="upload" id="upload" className="hidden"/>
                                                </label>
                                                <p className="py-2 text-gray-400">Tip: alleen .png of .jpg </p>
                                            </div>
                                        </div>
                                        <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full" type="submit">Create</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
            <section>
            <h2 className="text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">Products</h2>

            <div className="p-4">
            { products.length === 0 && (
                    <div className="flex justify-center items-center w-full p-24">
                        <span className="text-gray-500 text-lg m-auto">No products found</span>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
        

                    { products && products.map((product: Products) => {return (
                        <AdminItemCard key={product.id} product={product} />
                    )})}
                </div>
            </div>
            </section>
            </main>
        </>
    );
}
