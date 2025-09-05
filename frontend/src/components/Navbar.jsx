import {  NavLink, useNavigate } from "react-router-dom"
import {assets} from "../assets/assets"
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

    const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false)

    // if we have the token then we are logged in
    const {token,setToken}=useContext(AppContext)

    const logout=()=>{
        setToken(false)
        localStorage.removeItem('token')


    }

  return (
    <div className="flex items-center justify-between font-medium py-4 mb-5 border-b border-b-gray-400">
        <img onClick={()=>navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt=""  />
        <ul className="hidden md:flex items-start gap-5 font-medium">
            <NavLink to="/">
                <li className="py-1">Home</li>
                <hr />
            </NavLink>
            <NavLink to="/doctors">
                <li className="py-1">All Doctors</li>
                <hr />
            </NavLink>
            <NavLink to="/contact">
                <li className="py-1">Contact</li>
                <hr />
            </NavLink>
            <NavLink to="/about ">
                <li className="py-1">About</li>
                <hr />
            </NavLink>
        </ul>

        <div className="flex items-center gap-4 ">

            {
                token 
                ? <div className="flex items-center gap-2 cursor-pointer group relative">
                    <img className="w-10  rounded-full" src={assets.profile_pic} alt="" />
                    <img className="w-2.5" src={assets.dropdown_icon } alt="" />
                    <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                        <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                            <p className="hover:text-black cursor-pointer" onClick={()=>navigate('/my-profile')}>My Profiile</p>
                            {/* <p className="hover:text-black cursor-pointer" onClick={()=>navigate('/my-appointment')}>My Appointment</p> */}
                            <p className="hover:text-black cursor-pointer"  onClick={logout}>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=>navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-semibold  hidden md:block">Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
             

             {/* ---Mobile Menu----- */}

             <div className={`${showMenu ?'fixed w-full':'h-0 w-0'}  md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img src={assets.logo} alt="" />
                    <img onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>

                <ul className="flex flex-col items-centergap-2 mt-5 px-5 text-lg font-medium">
                    <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShowMenu(false)} to='/'>Home</NavLink>
                    <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShowMenu(false)} to='/doctors'>ALL DOCTORS</NavLink>
                    <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShowMenu(false)} to ='/about'>ABOUT</NavLink>
                    <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShowMenu(false)} to='/contact'>CONTACT</NavLink>
                </ul>
             </div>
        </div>
    </div>
  )
}

export default Navbar