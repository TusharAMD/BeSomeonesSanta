import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import QRCode from "react-qr-code";


function ReveiverForm(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState(user.email);
  const [publickey, setPublickey] = useState("");
  const [successStatus,setSuccessStatus]=useState(false);
  const [success,setSuccess]=useState(false)

  const [response, setResponse]= useState()
  function submitHandler(){
    console.log({email,publickey})
    
    axios.post(`http://localhost:5000/receiverblock`, {email,publickey})
      .then(res => {
        console.log(res);
        console.log(res.data);
        setResponse(res.data);
        setSuccessStatus(true);

        if (res.data["status"]=="Successful"){
            setSuccess(true)
        }

      })
  }
 
return(
  <>
  {! successStatus &&
  <div className='sender'>
  <p className='senderform'>
    <p className='formHeading'>Please Make sure parcel is sealed properly.</p>
    <form>
    <input
          readonly="readonly" 
          type="text" 
          value={user.email}
          onChange={(e) => setEmail(e.target.value)}
        />
    
    <input 
          type="text" 
          placeholder='Please Enter QR Code data'
          value={publickey}
          onChange={(e) => setPublickey(e.target.value)}
        />
    </form>
    <div onClick={submitHandler} className='submitbutton'>
      Submit
    </div>
  </p>
  
  </div>}
  {
  successStatus && success &&
  <div className='successstatus'>
      <img src = "https://i.ibb.co/YLtNgJh/clipart1795386.png"></img>
      
      <p className='success'>Success</p> <br/>
      <p className='successinfo'>
      Successfully Verified and Sender Received the message.
      </p>
  </div>
  }
  
  {
  successStatus && !success &&
  <div className='failedstatus'>
      <img src = "https://icon-library.com/images/failed-icon/failed-icon-7.jpg"></img>
      
      <p className='failed'>Failed</p> <br/>
      <p className='failedinfo'>
      Please Recheck Your Public Key (QR Code) or login using correct email ID
      </p>
  </div>
  }
  

  </>
)}
  
export default ReveiverForm;