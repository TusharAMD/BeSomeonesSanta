import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
function Homepage(){
  const { user, isAuthenticated, isLoading } = useAuth0();
return(
  <>
  <h1 className = "homepageHeading">Send Gifts <span>Anonymously</span></h1>
  <p className="homepagetagline">This festive season share happiness with your loved ones</p><br />
  <p className='gettingStarted'>
  {isAuthenticated && <a href="/senderform"><button className='custom-btn btn-3'>Getting Started</button></a>}
  </p>
  <img style={{width:"30vw", minWidth:"300px"}} src ="https://i.ibb.co/Ns1hZfb/606-removebg-preview-1.png"></img> 
  <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>

  </>
  )
  
}
export default Homepage;