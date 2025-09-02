import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import SocialMediaLinksService from './SocialMediaLinksService';



function ServiceLayout({ children }) {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <> <div className='bg-MainBGColorYellow'>
    <Outlet />
    <SocialMediaLinksService />  
    {children}
    </div>
    </>
  )
}

export default ServiceLayout