import { Fragment, useEffect, useState, } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation } from '@remix-run/react';
import {Link} from "@remix-run/react"
import { X } from 'react-feather';
import { useOptionalUser } from '~/utils';
export function CartTray({
  open,
  onClose,
  adjustOrderLine,
  removeItem,
}: {
  open: boolean;
  onClose: (closed: boolean) => void;
  adjustOrderLine?: (lineId: string, quantity: number) => void;
  removeItem?: (lineId: string) => void;
}) {  
  const user = useOptionalUser();
  const [state, setState] = useState<any>();

  useEffect(() => {
    setState(localStorage.getItem('cartItems'));
  }, [state]);


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
                        Shopping cart
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
                          { state?.length > 0 ? 
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                <li  className="py-6 flex">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <img
                                      src={state.itemImage}
                                      alt={state.itemName}
                                      className="w-full h-full object-center object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link to={`/products/`}>
                                            test
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          € 0.00
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                            </ul>
                            :
                            "Your cart is empty"
                          }
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                    <Link to="/checkout"  className="mt-4 px-4 py-2 text-center bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full m-auto">
                      Checkout
                    </Link>
                    </div>

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