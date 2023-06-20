import type { V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { Carousel } from 'flowbite-react';
import { Search, Heart } from 'react-feather';
import { useNavigate } from "react-router-dom";
import { Link } from "@remix-run/react";


export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Home" }];

export default function Index() {
  const navigate = useNavigate();
  return (
    <>
      <HomeSideBar/>
      <main className="px-4 md:px-24">
        <section id="search">
            <div className="flex p-4 w-full">
              <div className="relative w-full">
                  <Search className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"/>
                  <input
                      type="text"
                      placeholder="Search"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                          navigate(`/search/${e.currentTarget.value}`);
                        }
                      }}
                  />
              </div>
            </div>
        </section>
        <section className="p-4 h-[20rem]">
          <Carousel>
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            />
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            />
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            />
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            />
            <img
              alt="..."
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            />
          </Carousel>
        </section>
        <section>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
              <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                <div>
                  <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
                  <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                    <Heart/>
                  </div>
                  </div>

                  <div className="relative block h-full">
                  <div className="h-32 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                  Shopname
                </h2>

                <p className="mt-2 text-gray-800 text-sm">Description</p>

                <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
                  View shop
                </button>
              </div>

              <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                <div>
                  <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
                  <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                    <Heart/>
                  </div>
                  </div>

                  <div className="relative block h-full">
                  <div className="h-32 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                  Shopname
                </h2>

                <p className="mt-2 text-gray-800 text-sm">Description</p>
                <Link to="/shop/1">
                  <button  className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
                    View shop
                  </button>
                </Link>
              </div>

              <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                <div>
                  <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
                  <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                    <Heart/>
                  </div>
                  </div>

                  <div className="relative block h-full">
                  <div className="h-32 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                  Shopname
                </h2>

                <p className="mt-2 text-gray-800 text-sm">Description</p>

                <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
                  View shop
                </button>
              </div>

              <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                <div>
                  <div className="absolute top-0 right-0 mt-2 mr-2 p-4 z-20 flex justify-between">
                  <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
                    <Heart/>
                  </div>
                  </div>

                  <div className="relative block h-full">
                  <div className="h-32 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>

                <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
                  Shopname
                </h2>

                <p className="mt-2 text-gray-800 text-sm">Description</p>

                <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full">
                  View shop
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
