import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../../components/ui/sidebar/HomeSideBar"
import { redirect } from "@remix-run/node";
import axios from "axios"
import { Form, Link } from "@remix-run/react";
import { useCart } from "react-use-cart";
import {
  ValidatedForm,
  validationError,
} from "remix-validated-form";
import { CheckOutValidator } from "~/validators/checkOutValidator";
import { FormTextInput } from "~/components/ui/form/inputWithError";

export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Home" }];

export const action: ActionFunction = async ({ request }) => {
    const data = await CheckOutValidator.validate(
      await request.formData()
    ); /* Validate the form data against the validator */	

    if (data.error) return validationError(data.error); /* Run this before axios request, no point in wasting a request if the form is invalid */


    const resp = await axios.post('https://api.mollie.com/v2/payments', { 
        "description": "LC Cart", 
        "redirectUrl": "https://localmarketpgm.netlify.app/paymentStatus?orderId=1234",
        "webhookUrl": "https://localmarketpgm.netlify.app/paymentStatus", // Reminder: only works with a server that mollie can view
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
    return redirect(await resp.data._links.checkout.href);
}

export default function Index() {
    const {
        totalItems,
        cartTotal,
        items,
        updateItemQuantity,
        removeItem,
      } = useCart();
    
    return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-24 mt-12 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                        Contact information
                        </h2>
                </div>
                <ValidatedForm validator={CheckOutValidator} method="post">
                <div className="mt-10 border-t border-gray-200 pt-10">
                    <input type="hidden" name="action" value="setOrderCustomer" />
                    <div className="mt-4">
                      <FormTextInput
                            type="email"
                            label="Email"
                            name="email"
                            placeholder="yourname@email.com"
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <FormTextInput
                            type="text"
                            label="First Name"
                            name="firstName"
                            placeholder="John"
                      />
                    </div>

                      <FormTextInput
                              type="text"
                              label="Last Name"
                              name="lastName"
                              placeholder="Doe"
                        />
                    </div>
                </div>

                    <input type="hidden" name="action" value="setCheckoutShipping" />
                    <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                        Shipping information
                    </h2>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                    <FormTextInput
                            type="text"
                            label="Street Name"
                            name="streetName"
                            placeholder="overpoortstraat"
                      />
                    </div>

                    <div>
                    <FormTextInput
                            type="text"
                            label="House Number"
                            name="houseNumber"
                            placeholder="12"
                      />
                    </div>
                    </div>
                    <div className="mt-4">
                    <FormTextInput
                            type="text"
                            label="Postcode"
                            name="postCode"
                            placeholder="9000"
                      />
                    </div>
                    <button
                    type="submit"
                    className={'flex bg-[#FF5C28] hover:bg-[#ba3d14] w-full items-center justify-center space-x-2 mt-24 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}
                >
                    <span>Proceed to payment</span>
                </button>
                </ValidatedForm>            

            </div>
            <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Order summary
                </h2>
                { items.map((item) => (
                            <ul key={item.id} role="list" className="-my-6 divide-y divide-gray-200">
                                <li  className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link  to={`/product/${item.id}`}>
                                            { item.name }
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          € { item.itemTotal}
                                        </p>
                                      </div>
                                    </div>
                                    <Form>
                                      <label htmlFor={`quantity-${item.id}`} className="mr-2">
                                        Quantity
                                      </label>
                                      <select
                                        id={`quantity-${item.id}`}
                                        name={`quantity-${item.id}`}
                                        value={item.quantity}
                                        onChange={(e) => updateItemQuantity(item.id, +e.target.value)}
                                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                      </select>
                                    </Form>
                                    <div className="flex-1"></div>
                                  <div className="flex">
                                      <button
                                        type="submit"
                                        name="removeItem"
                                        value={item.id}
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                        onClick={() => removeItem(item.id)}
                                      >
                                        Remove
                                      </button>
                                  </div>
                                  </div>
                                </li>
                            </ul>
                          ))}
                { totalItems > 0 && (
                <dl className="border-t mt-6 border-gray-200 py-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          € { cartTotal }
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          € 4,95
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">
                          € { cartTotal + 4.95 }
                        </dd>
                      </div>
                    </dl>
                )}
            </div>

            </main>
        </>
    );
}
