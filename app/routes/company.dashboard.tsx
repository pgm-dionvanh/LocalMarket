import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import { HomeSideBar, AdminNav } from "~/components/ui";
import { json, unstable_createFileUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useUser } from "~/utils";
import { requireUserId } from "~/session.server"
export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Dashboard` }];

export const loader = async ({ request }: LoaderArgs) => {
    const userId = await requireUserId(request);
    return json({ userId });
  };

export const fileUploadHandler = unstable_createFileUploadHandler({
    directory: './public/uploads',
    file: ({ filename }) => filename,
});  

export const action: ActionFunction = async ({ request }) => {
    const formData = await unstable_parseMultipartFormData(request, fileUploadHandler);
    console.log(formData.get('upload')); // will return the filename
    console.log(formData.get('name')); 
    console.log(formData.get('description'));
    return {};
  };
  

export default function Index() {
    const user = useUser();
    const actionData = useActionData();
    console.log( actionData)
    return (
    <>
        <HomeSideBar/>
        <AdminNav/>
            <main className="px-4 md:px-48 mt-12">

            <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="border-b-2  p-4 text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">Create Shop</h2>
                                <div className="p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                                    <Form method="post" encType="multipart/form-data">
                                        <div className="flex flex-col gap-4">
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="name">Shop name</label>
                                                <input type="text" id="name" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autocomplete="off" />
                                            </div>
                                            <div className="mb-4 pt-0 flex flex-col">
                                                <label className="mb-2 text-gray-800 text-lg font-light" htmlFor="description">Shop description</label>
                                                <input type="text" id="description" className="border-2 rounded h-10 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300" autocomplete="off" />
                                            </div>

                                            <div className="pt-0 flex flex-col">
                                                <label className="mb-4 text-gray-600 text-lg font-light" htmlFor="image">Logo</label>
                                                <label htmlFor="image" className="flex flex-col items-center justify-center border-4 border-gray-300 border-dashed rounded h-36 px-6 text-lg text-gray-600 focus:outline-none focus:ring focus:border-blue-300 cursor-pointer" autocomplete="off">
                                                    <svg className="w-8 h-8 text-gray-600
                                                    " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                                                    <span className="mt-2 text-base leading-normal text-blue-500 font-bold">Selecteer een logo</span>
                                                    <input type="file" id="product_image" className="hidden"/>
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
            <section className="my-36">
                    <div className="container mx-auto px-2">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-center sm:text-left font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">My Shops</h2>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
