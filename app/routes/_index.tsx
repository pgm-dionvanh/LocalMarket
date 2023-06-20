import type { V2_MetaFunction } from "@remix-run/node";
import { Carousel } from 'flowbite-react';
import { Search, Heart } from 'react-feather';
import { useNavigate } from "react-router-dom";
import { Link } from "@remix-run/react";
import { ShopCard, HomeSideBar, Hero } from "../components/ui";
import { getAllShops } from "./../models/shops.server.ts";
import {  useLoaderData } from "@remix-run/react";
import Shop from "./../interfaces/shop.interface.ts";
export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Home" }];

export const loader = async () => {
  const shopsList = await getAllShops();
  return shopsList;
 };
 

export default function Index() {
  const navigate = useNavigate();
  const data = useLoaderData();

  console.log(data)

  return (
    <>
      <HomeSideBar/>
      <main className="flex-1">
        <Hero/>
        <div className="px-4 md:px-24">
          
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
          { data.length === 0 && (
                  <div className="flex justify-center items-center w-full p-24">
                    <span className="text-gray-500 text-lg m-auto">No shops found</span>
                  </div>
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
    

      
            </div>
          </div>
        </section>
        </div>

      </main>
    </>
  );
}
