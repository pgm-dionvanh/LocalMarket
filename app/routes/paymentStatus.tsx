import { json } from "@remix-run/node";
import { HomeSideBar, Hero } from "../components/ui";

export const loader = async ({params}) => {

    return json({ message: params.id })
};

export default function Index() {
    return (
        <>
        <HomeSideBar/>
        <main className="flex-1">
            <div className="flex flex-col gap-4 justify-center items-center">
                <img className="w-32 h-32" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png" alt="" />
                <span>Order completed</span>
            </div>
        </main>
        </>
    )
}