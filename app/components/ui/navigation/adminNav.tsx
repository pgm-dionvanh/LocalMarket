import { Link } from "@remix-run/react";

export default function AdminNav() {
    return (
     <nav className="p-4 px-52 bg-white shadow-md w-full">
        <ul className="flex gap-4">
            <Link to="/company/dashboard">
                My Shops
            </Link>
            <Link to="/company/settings">
                Settings
            </Link>
        </ul>
     </nav>
    );
}