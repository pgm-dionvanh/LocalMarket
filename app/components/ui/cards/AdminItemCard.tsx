import { Heart, GitHub } from "react-feather";
import { Link, Links, NavLink } from "@remix-run/react";
import { CartTray } from "../cart/CartTray";
import { Products } from "@prisma/client";
import { deleteProduct } from "~/models/products.server";


const deleteItem = async (id: string) => {
    const deletedProduct = await deleteProduct(id)
}


export default function AdminItemCard({ product }: Products) {

    return (
        <div className="relative flex w-full md:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                    <a className="relative mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                                        <img className="object-cover bg-gray-100" src={product.image} alt="product image" />
                                    </a>
                                    <div className="mt-4 px-5 pb-5">
                                        <a href="#">
                                        <h5 className="text-xl tracking-tight text-slate-900">{ product.name }</h5>
                                        </a>
                                        <div className="mt-2 mb-5 flex items-center justify-between">
                                        <p>
                                            <span className="text-3xl font-bold text-slate-900">€ { product.price }</span>
                                        </p>
                                     
                                        </div>
                                        <button onClick={() => deleteItem(product.id)} className="flex items-center justify-center rounded-md bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                            Delete product
                                        </button>
                                        
                                    </div>
                                    </div>

    );
}