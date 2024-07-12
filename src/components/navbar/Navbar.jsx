import { Link } from "react-router-dom";
import Search_Bar from "./Search_Bar";

const Navbar = () => {
    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/all_products'}>All Product</Link>
            </li>

            {/* Signup */}
            <li>
                <Link to={'/sign_up'}>Signup</Link>
            </li>

            {/* User */}
            <li>
                <Link to={'/user_dashboard'}>User</Link>
            </li>

            {/* Admin */}
            {/* <li>
                <Link to={'/'}>Admin</Link>
            </li> */}

            {/* logout */}
            {/* <li>
                logout
            </li> */}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart(0)
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className="bg-pink-600 sticky top-0 z-50">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                    <h2 className=" font-bold text-white text-2xl text-center">E-Bharat</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <Search_Bar />
            </div>
        </nav>
    );
}

export default Navbar;