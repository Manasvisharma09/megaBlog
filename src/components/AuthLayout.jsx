import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus === null) {
      // If the authentication status is not yet determined, keep loading.
      setLoader(true);
    } else if (authentication && authStatus !== authentication) {
      // If authentication is required and user is not authenticated, redirect to login.
      navigate('/login');
    } else if (!authentication && authStatus === authentication) {
      // If no authentication is required and user is authenticated, redirect to home.
      navigate('/');
    } else {
      // Otherwise, authentication is as expected, stop loading.
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
