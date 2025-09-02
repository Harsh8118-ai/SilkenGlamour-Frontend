import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function ContactLayout({ children }) {
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <><div> 
    <Outlet />
    {children}
    </div>
    </>
  )
}

export default ContactLayout