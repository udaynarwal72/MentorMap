import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { authState, checkAuthSelector } from "../../recoil/Authuser";
import { useEffect } from "react";

const NavBar = () => {
    const authStatus = useRecoilValueLoadable(checkAuthSelector);
    const [auth, setAuth] = useRecoilState(authState);

    useEffect(() => {
        if (authStatus.state === "hasValue") {  // Fixed assignment to comparison
            setAuth(authStatus.contents);  // Fixed reference to correct variable
        }
    }, [authStatus.state, authStatus.contents, setAuth]);  // Fixed dependency array

    return (
        <nav className="bg-gray-600 p-4 shadow-lg">
            <ul className="flex justify-around">
                <li>
                    <Link to="/" className="text-white font-semibold hover:text-gray-200">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-white font-semibold hover:text-gray-200">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="text-white font-semibold hover:text-gray-200">
                        Contact
                    </Link>
                </li>
                <li>
                    {
                        !auth?.user ? <>
                            <Link to="/login" className="text-white font-semibold hover:text-gray-200">
                                Login
                            </Link>
                        </> :
                            <>
                                <Link to={`/user/${auth?.user._id}`} className="text-white font-semibold hover:text-gray-200">
                                    Hello, {auth.user.firstname}
                                </Link>
                            </>
                    }
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
