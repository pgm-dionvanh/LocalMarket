import { Heart, GitHub } from "react-feather";

export default function Footer() {
    return (
        <footer className="p-8 px-32  w-full shadow-gray-500 shadow-xl bg-white">
            <div className="flex justify-between items-center">
                <span className="flex items-center gap-4">Made with <Heart className="text-red-500"/></span>
                <a href="https://github.com/pgm-dionvanh/LocalMarket"><GitHub/></a>
                <span>&copy; 2023</span>
            </div>
        </footer>
    );
}