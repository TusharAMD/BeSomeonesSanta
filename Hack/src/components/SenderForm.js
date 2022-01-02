import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
function SenderForm(){
  const { user, isAuthenticated, isLoading } = useAuth0();
return(
  <>
  <div className='sender'>
  <p className='senderform'>
    <p className='formHeading'>Please Enter Details of your Package</p>
  </p>
  </div>
  </>
  )
  
}
export default SenderForm;