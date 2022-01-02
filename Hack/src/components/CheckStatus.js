import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
function CheckStatus(){

    function submitHandler{
        axios.post(`http://localhost:5000/checkstatus`, {privateKey})
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
    }

const [privateKey,setPrivateKey]=useState("")
return(
  <div className='checkstatus'>
  <h1>Check Status of your Parcel</h1>
    <input
          type="text" 
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        /><br/>
    <button onClick={submitHandler} className='submitbutton'>Submit</button>
  </div>
  )
  
}
export default CheckStatus;