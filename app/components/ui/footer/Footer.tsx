import { Heart, GitHub } from "react-feather";

export default function Footer() {
    return (
        <footer className="bg-gray-100 bottom-0 p-8 px-32 fixed w-full">
            <div className="flex justify-between items-center">
                <span className="flex items-center gap-4">Made with <Heart className="text-red-500"/></span>
                <a href="https://github.com/pgm-dionvanh/LocalMarket"><GitHub/></a>
                <span>&copy; 2023</span>
            </div>
        </footer>
    );
}