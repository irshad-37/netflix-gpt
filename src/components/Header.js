import React from 'react'
import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate=useNavigate();
    const user=useSelector((store)=>store.user);
    const handleSignOut=()=>{
    signOut(auth)
        .then(() => {
        navigate("/");
    }).catch((error) => {
        navigate("/error");
    });
    };
  return ( 
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
        <div className='flex justify-between'>
            <img className='w-44'
                src="https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png"
                alt="logo"
            />
            { user &&<div className='px-8 py-9'>
                <img alt="img" src='https://occ-0-4085-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'/>
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
            </div>}
        </div>
       
    </div>
  )
}

export default Header