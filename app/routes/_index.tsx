import type { V2_MetaFunction } from "@remix-run/node";
import { Carousel } from 'flowbite-react';
import { Search, Heart } from 'react-feather';
import { useNavigate } from "react-router-dom";
import { ShopCard, HomeSideBar, Hero } from "../components/ui";
import { getAllShops } from "~/models/shops.server";
import {  useLoaderData } from "@remix-run/react";
import Shop from "./../interfaces/shop.interface";
import { RemixPagination } from '@ignisda/remix-pagination';


export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Home" }];

export const loader = async ({request}) => {
  const url = new URL(request.url);
  const offset = (parseInt(url.searchParams.get('page') || '1') - 1) * 10;

  const shopsList = await getAllShops(offset);
  return { shops: shopsList.data, count: shopsList.pagination.total };
 };
 

export default function Index() {
  const navigate = useNavigate();
  const { shops, count} = useLoaderData();


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
                      placeholder="Postcode"
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
            <span className="bg-gray-500 h-full flex justify-center items-center text-white text-2xl">Wilt u een spotlight stuur een mail naar: info@localmarket.be</span>
            <span className="bg-gray-500 h-full flex justify-center items-center text-white text-2xl">Wilt u een spotlight stuur een mail naar: info@localmarket.be</span>
            <span className="bg-gray-500 h-full flex justify-center items-center text-white text-2xl">Wilt u een spotlight stuur een mail naar: info@localmarket.be</span>
            <span className="bg-gray-500 h-full flex justify-center items-center text-white text-2xl">Wilt u een spotlight stuur een mail naar: info@localmarket.be</span>
          </Carousel>
        </section>
        <section>
          <div className="p-4">
          { shops.length === 0 && (
                  <div className="flex justify-center items-center w-full p-24">
                    <span className="text-gray-500 text-lg m-auto">No shops found</span>
                  </div>
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
    

                { shops && shops.map((shop: Shop) => {return (
                  <ShopCard key={shop.id}  shop={shop}/>
                )})}
            </div>
          </div>
          
        </section>
        </div>
        <div className="flex items-center justify-center mt-12">
                    <RemixPagination total={count || 0} size={20} classPrefix="lc" />
          </div>
      </main>
    </>
  );
}
