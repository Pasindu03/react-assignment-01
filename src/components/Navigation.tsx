import { Link } from "react-router";
import "../assets/Navigation.css";

export function Navigation() {
    return (
        <header className="bg-gray-800 shadow-lg">
            <nav className="px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link
                        className="text-white font-bold font-serif text-2xl hover:text-blue-400 transition"
                        to="/"
                    >
                        Netly
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            className="text-gray-300 hover:text-white transition font-medium"
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            className="text-gray-300 hover:text-white transition font-medium"
                            to="/customer"
                        >
                            Customer
                        </Link>
                        <Link
                            className="text-gray-300 hover:text-white transition font-medium"
                            to="/items"
                        >
                            Item
                        </Link>
                        <Link
                            className="text-gray-300 hover:text-white transition font-medium"
                            to="/orders"
                        >
                            Orders
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            id="menu-toggle"
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* "New Order" Button */}
                    <Link
                        to="/orderdetail"
                        className="hidden md:inline-block bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition"
                    >
                        New Order
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className="hidden md:hidden flex flex-col space-y-2 mt-4"
                >
                    <Link
                        className="text-gray-300 hover:text-white transition font-medium"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-gray-300 hover:text-white transition font-medium"
                        to="/customer"
                    >
                        Customer
                    </Link>
                    <Link
                        className="text-gray-300 hover:text-white transition font-medium"
                        to="/items"
                    >
                        Item
                    </Link>
                    <Link
                        className="text-gray-300 hover:text-white transition font-medium"
                        to="/orders"
                    >
                        Orders
                    </Link>
                    <Link
                        className="text-gray-300 hover:text-white transition font-medium"
                        to="/neworders"
                    >
                        New Orders
                    </Link>
                </div>
            </nav>
        </header>
    );
}
