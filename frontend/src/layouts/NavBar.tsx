import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LogIn, LogOut, Menu, User, UserPlus } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Settings from "@/components/Settings";

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <nav className="bg-white shadow border border-b-gray-300 dark:bg-black dark:border-b-white/25">
      {user && token && <Settings />}
      <div className="">
        <header className="shadow-md">
          <div className="container">
            <Link to="/" className="logo">
              <img src="./images/logo.png" alt="Funel logo" />
            </Link>

            <div className="navbar-wrapper">
              <button className="navbar-menu-btn" data-navbar-toggle-btn>
                <Menu className="w-6 h-6" />
              </button>

              <nav className="navbar" data-navbar>
                <ul className="navbar-list">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <a href="#about" className="nav-link">
                      What we do
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="#features" className="nav-link">
                      Why us?
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      Our work
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="#contact" className="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>
                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                  {user && token ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <User className="mr-2 h-6 w-6" />
                          {user?.email}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={"/profile"}>
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onSelect={handleLogout}
                          className="cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Link to={"/login"} className="cursor-pointer">
                        <Button variant="ghost" className="px-8 py-6">
                          <LogIn className="mr-2 h-4 w-4" />
                          Log in
                        </Button>
                      </Link>
                      <Link to={"/signup"} className="cursor-pointer">
                        <Button className="px-8 py-6 bg-[#f65b55] hover:bg-[#ec524d]">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
                <div className="flex items-center sm:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user && token ? (
                        <>
                          <Link to={"/profile"}>
                            <DropdownMenuItem className="cursor-pointer">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            onSelect={handleLogout}
                            className="cursor-pointer"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <Link to={"/login"}>
                            <DropdownMenuItem className="cursor-pointer">
                              <LogIn className="mr-2 h-4 w-4" />
                              Login
                            </DropdownMenuItem>
                          </Link>
                          <Link to={"/signup"}>
                            <DropdownMenuItem className="cursor-pointer">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Sign Up
                            </DropdownMenuItem>
                          </Link>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* <button className="btn btn-primary">Get in touch</button> */}
              </nav>
            </div>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default NavBar;
