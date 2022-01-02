import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import QRCode from "react-qr-code";


function SenderForm(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [smobile, setsMobile] = useState("");
  const [location,setLocation] = useState("");
  const [qrCode,setqrCode] = useState(false);
  const senderemail = user.email
  const [response, setResponse]= useState()
  function submitHandler(){
    console.log({senderemail,email,mobile,location})
    
    axios.post(`http://localhost:5000/createblock`, {senderemail,email,smobile,mobile,location})
      .then(res => {
        console.log(res);
        console.log(res.data);
        setResponse(res.data)
        setqrCode(true);
      })
  }
  function printHandler(){
    var divContents = document.getElementById("printable").innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    
    
    a.document.write('<html>');
    a.document.write('<body >');
    
    a.document.write(divContents);
    a.document.write('</body></html>');
    
    a.document.close();
    a.print();
  }
return(
  <>
  {!qrCode &&
  <>
  <div className='sender'>
  <p className='senderform'>
    <p className='formHeading'>Please Enter Details of your Package</p>
    <form>
    <input 
          type="text" 
          placeholder='Please Enter Email ID of receiver'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
    <input 
          type="text" 
          placeholder='Please Enter Your Mobile No'
          value={smobile}
          onChange={(e) => setsMobile(e.target.value)}
        />
    <input 
          type="text" 
          placeholder='Please Enter Mobile No of receiver'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
    <input 
          type="text" 
          placeholder='Please Enter Location of receiver'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
    </form>
    <div onClick={submitHandler} className='submitbutton'>
      Submit
    </div>
  </p>
  
  </div>
  
  <p className='receivelink'><a href='/packagedetails'>Got Package? Click Here!</a></p>
  </>}
  {qrCode && 
  <div className="qr">
    
    <img style={{width:"2em"}} src ="https://c.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"></img>
    <p>Submitted Successfully</p>
  <div className='packageQrCode' id='printable'>
    <p>Package Details</p>
    <div className='packdetails'>
      <p>Address</p>
      <p>{location}</p>
      <p>Email</p>
      <p>{email}</p>
      <p>Mobile</p>
      <p>{mobile}</p>
    </div>
    <QRCode value={response.publicKey} />
    <br />
    <button onClick={printHandler}>Print</button>

  </div>
  </div>}
  </>
  )
  
}
export default SenderForm;