import { useState } from "react";
import { Link } from "@remix-run/react";
import { AlignCenter, Heart, Bell, User, ShoppingCart } from 'react-feather';
import { Dropdown } from 'flowbite-react';
import { useOptionalUser } from "~/utils";
import { CartTray } from "./../cart/CartTray"

export default function SideBarHome() {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const user = useOptionalUser();
	const [openCart, setCardOpen] = useState(false);

    return (
		<>
		<header className="flex flex-wrap items-center justify-between p-4 shadow-">
			<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
				<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
					<Link className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-[#FF5C28]" to="/">
						LC
					</Link>
					<button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
						<AlignCenter/>
					</button>
					</div>
					<div
						className={
						"lg:flex flex-grow items-center" +
						(navbarOpen ? " flex" : " hidden")
						}
						id="example-navbar-danger"
					>
						<ul className="flex flex-col items-center w-full md:w-auto gap-4 lg:flex-row list-none lg:ml-auto">
						<li>
							<Link to="/favourites">
								<Heart/>
							</Link>
						</li>
						<li>
							<ShoppingCart className="cursor-pointer" onClick={() => setCardOpen(true)}/>
						</li>
						<li className="nav-item">
							<Dropdown inline label={<User/>}>
								{ user?.email ? 
									<>
										<Dropdown.Header>
											<span className="block text-sm">
												{ user?.firstName } { user?.lastName }
											</span>
											<span className="block truncate text-sm font-medium">
												{ user?.email }
											</span>
										</Dropdown.Header>
										<Dropdown.Item>
											<Link to="/company/dashboard">
												Dashboard
											</Link>
										</Dropdown.Item>
										<Dropdown.Divider/>

										<form action="/logout" method="post" className="py-2 px-5 flex justify-start items-center w-full">
											<button type="submit" className="button text-red-500">
												Logout
											</button>
										</form>
							
									</> 
								: 
								<>
									<Dropdown.Item>
										<Link to="/signin">Login</Link>
									</Dropdown.Item>
									<Dropdown.Item>
										<Link to="/signup">Sign up</Link>
									</Dropdown.Item>
								</>
								}
							</Dropdown>
						</li>
					</ul>
				</div>
			</div>
		</header>
		<CartTray
			open={openCart}
			onClose={() => setCardOpen(false)}
		/>
		</>
    );
}