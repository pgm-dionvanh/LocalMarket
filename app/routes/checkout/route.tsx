import type { V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../../components/ui/sidebar/HomeSideBar"
import { Carousel } from 'flowbite-react';
import { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import createMollieClient from "@mollie/api-client";
import axios from "axios"
import { Form, useFetcher, useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Home" }];

export async function loader({ request }: LoaderArgs) {
    const resp = await axios.post('https://api.mollie.com/v2/payments', { 
        "description": "test", 
        "redirectUrl": "http://localhost:3000", 
        "method": "bancontact",
        "amount": {
          "value": "10.00",
          "currency": "EUR"
        },
    },  
    {
        headers: {
            'Authorization': 'Bearer ' + 'test_RGA45yCdS46Knfmn5RjeMUNz4hEpC3',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
    return json({ paymentLink: await resp.data._links.checkout.href })

}

export default function Index() {
    const resp = useLoaderData();
    return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-24 mt-12">
                <div>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                        Contact information
                        </h2>
                </div>
                <div className="mt-10 border-t border-gray-200 pt-10">
                <Form
                    method="post"
                    action="/api/active-order"

                >
                    <input type="hidden" name="action" value="setOrderCustomer" />
                    <div className="mt-4">
                    <label
                        htmlFor="emailAddress"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                        <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                        >
                        First name
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            autoComplete="given-name"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Last name
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            autoComplete="family-name"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                </Form>
                </div>

                <Form method="post">
                    <input type="hidden" name="action" value="setCheckoutShipping" />
                    <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                        Shipping information
                    </h2>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                        <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Street name
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            autoComplete="given-name"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                        >
                        House number
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            autoComplete="family-name"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="mt-4">
                    <label
                        htmlFor="emailAddress"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Postcode
                    </label>
                    <div className="mt-1">
                        <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    </div>
                </Form>            
                <button
                    type="button"
                    className={'flex bg-[#FF5C28] hover:bg-[#ba3d14] w-full items-center justify-center space-x-2 mt-24 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}
                >
                    <span>Proceed to payment</span>
                </button>
            </div>
            </main>
        </>
    );
}
