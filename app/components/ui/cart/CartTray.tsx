import { Fragment, useEffect, useState, } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Form, useLocation } from '@remix-run/react';
import {Link} from "@remix-run/react"
import { X } from 'react-feather';
import { useOptionalUser } from '~/utils';
import { useCart } from "react-use-cart";

export function CartTray({
  open,
  onClose,
  adjustOrderLine,
}: {
  open: boolean;
  onClose: (closed: boolean) => void;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {  
  const user = useOptionalUser();

  const {
    isEmpty,
    totalUniqueItems,
    totalItems,
    cartTotal,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-20"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart ({totalUniqueItems})
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => onClose(false)}
                        >
                          <span className='sr-only'>Close panel</span>
                          <X/>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-center h-48 text-xl text-gray-400">
                        {items.map((item) => (
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
                                          <Link onClick={() => open = false} to={`/product/${item.id}`}>
                                            { item.name }
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          € { item.price}
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
                        </div>
                    </div>

                    {totalItems && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          € { cartTotal }
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping will be calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          onClick={() => onClose(false)}
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white  bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  )}

                  </div>

          
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}