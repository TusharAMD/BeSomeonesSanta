import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Homepage from './Homepage'
import SenderForm from './SenderForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Navbar(){

const { loginWithRedirect, logout  } = useAuth0();
const { user, isAuthenticated, isLoading } = useAuth0();
console.log(isAuthenticated)
if (isAuthenticated==false){
return(
  <>
  
  <ul className = "Navibar">
  <li><a href="#home">Be Someone's Santa</a></li>
  
  <li style={{float:"right"}} onClick={() => loginWithRedirect()}>Login</li>
  </ul>

  <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
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
      </Routes>
    </BrowserRouter>
  </>
  )
}
}
export default Navbar;