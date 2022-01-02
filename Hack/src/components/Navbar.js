import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Homepage from './Homepage'
import SenderForm from './SenderForm'
import CheckStatus from './CheckStatus'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReceiverForm from './ReceiverForm';

function Navbar(){

const { loginWithRedirect, logout  } = useAuth0();
const { user, isAuthenticated, isLoading } = useAuth0();
console.log(isAuthenticated)
if (isAuthenticated==false){
return(
  <>
  
  <ul className = "Navibar">
  <li><a href="/">Be Someone's Santa</a></li>
  
  <li style={{float:"right"}} onClick={() => loginWithRedirect()}>Login</li>
  </ul>

  <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/checkstatus" element={<CheckStatus />}/>
      </Routes>
    </BrowserRouter>

  
  </>
  )
}

else{
return(
  <>
  <ul className = "Navibar">
  <li><a class="active" href="#home">Be Someone's Santa</a></li>

  
  <li style={{float:"right"}} onClick={() => logout()}>Logout</li>
  <li style={{float:"right"}}>Welcome, {user.name}</li>
  </ul>

  <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/senderform" element={<SenderForm />}/>
        <Route exact path="/packagedetails" element={<ReceiverForm />}/>
        <Route exact path="/checkstatus" element={<CheckStatus />}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}
}
export default Navbar;