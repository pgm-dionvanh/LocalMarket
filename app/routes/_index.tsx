import type { V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"

import { Carousel } from 'flowbite-react';

export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Home" }];

export default function Index() {
  return (
    <>
      <HomeSideBar/>
      <main className="px-4 md:px-24">
        <section id="search">
            <div className="p-4 w-full">
                <input type="text" className="w-full rounded-md" placeholder="Postcode" name="" id="" />
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
          <div className="p-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <span>cards</span>
          </div>
        </section>
      </main>
    </>
  );
}
