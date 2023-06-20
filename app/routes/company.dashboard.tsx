import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { unstable_createFileUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
export const meta: V2_MetaFunction = () => [{ title: `Local Market ~ Dashboard` }];

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
    const actionData = useActionData();
    console.log( actionData)
    return (
    <>
        <HomeSideBar/>
            <main className="px-4 md:px-48 mt-12">
            <Form method="post" encType="multipart/form-data">
                <input type="text" name="name" placeholder="Shopname" />
                <input type="text" name="description" placeholder="Shopdescription"/>
                <input type="file" name="upload" />
                <button type="submit">upload</button>
            </Form>
            </main>
        </>
    );
}
