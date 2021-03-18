import { useContext, useState, } from "react";
import { useHistory, useLocation } from "react-router";
import { usercontext } from "../../App";
import { inititalizeloginframework } from "./Loginmanager";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

//firebase.initializeApp(firebaseConfig);

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);    
  }


function Login() {
  const [loggeduuser,setloggedusser]=useContext(usercontext);
  const history=useHistory()
  const location =useLocation()
 
  let { from } = location.state || { from: { pathname: "/" } };

   const [newuser,setnewuser]=useState(false);
     const [user,setuser]=useState({
       issignedin: false,
       error:"",
       name: '',
       success:'',
       email: '',
       password: '',
       photo: ''
     })
     const provider = new firebase.auth.GoogleAuthProvider();
     const handleclick= ()=>{
         console.log('sign in');
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
      const {displayName,photoURL,email}=result.user;
      const signeduser={
        issignedin: true,
        name: displayName,
        Email: email,
        photo: photoURL
      }
      setuser(signeduser)
      //console.log(displayName, photoURL,email)
  });

  }
  const signedout=()=>{
    console.log('get lost')
    firebase.auth().signOut().then(() => {
      const signedoutuser={
        issignedin: false,
        name: '',
        password:'',
        photo: '',
        email: ''
      }
      setuser(signedoutuser)
    }).catch((error) => {
      // An error happened.
    });
     
     }
     const handlechange=(e)=>{
       //console.log(e.target.name, e.target.value)
       let isvalid=true;
       if(e.target.name ==="email"){
             isvalid=/\S+@\S+\.\S+/.test(e.target.value)
             console.log(isvalid)
       }
       if(e.target.name=== 'password'){
              const ispasswordvalid=e.target.value.length>6;
              const hasnumber= /^[a-zA-Z]/.test(e.target.value) 
              console.log(ispasswordvalid,hasnumber)
           isvalid=ispasswordvalid&&hasnumber
           console.log("isvalid" , isvalid)
       }
       if(isvalid){
         const newuser={...user}
          newuser[e.target.name]=e.target.value;
          setuser(newuser)
       }
     }
     const handlesubmit=(e)=>{
  
      if(newuser &&user.email && user.password){
        console.log(user.email,user.password)
       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
       .then(res => {
         const newuserinfo={...user};
         newuserinfo.error='';
         newuserinfo.success=true
         setuser(newuserinfo);
         updateinformation(user.name)
       })
       .catch((e) => {
         var errorCode = e.code;
         var errorMessage = e.message;
         const newuserinfo={...user};
         newuserinfo.error=errorMessage;
         newuserinfo.success=false 
         setuser(newuserinfo)
         console.log(errorCode,errorMessage)
       });
      }
       
      if(!newuser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res => {
    const newuserinfo={...user};
    newuserinfo.error='';
    newuserinfo.success=true
    setuser(newuserinfo);
    setloggedusser(newuserinfo);
    history.replace(from)
  })
  .catch((e) => {
        var errorCode = e.code;
         var errorMessage = e.message;
         const newuserinfo={...user};
         newuserinfo.error=errorMessage;
         newuserinfo.success=false
         setuser(newuserinfo)
  });
      }
      e.preventDefault();
      }
 const updateinformation= name=>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,

  }).then(function() {
    console.log("user updated successfully")
  }).catch(function(error) {
    console.log(error)
  });
 }
 const facebooklogin=()=>{
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {

  })
  .catch((error) => {
  
  });
 }
     
  return (
    
    <div style={{textAlign:'center'}}>
      {
        user.issignedin ?<button onClick={signedout}>Sign Out</button>: <button onClick={handleclick}>sign in</button>  
      }
      {
        user.issignedin && <div> 
           <p> welcome {user.name}</p>
           <img src={user.photo} alt=""/>
        </div>
      }

      <button onClick={facebooklogin}>login using facebook</button>
      <input type="checkbox" onChange={()=> setnewuser(!newuser)}name="newuser" id=""/>
      <label htmlFor="newuser">Signup</label>     
      <form onSubmit={handlesubmit}>
      { newuser && <input type="text" name="name" onBlur={handlechange} placeholder="Enter your Name" required/>}
        <br/>
        <input type="text" name="email" onBlur={handlechange} placeholder="Enter your email" required/>
        <br/>
        <input type="password" name="password" onBlur={handlechange} placeholder="Enter your password"/>
        <br/>
       <input type="submit" value="Submit"/>
      </form>
      {
        user.success ? <p style={{color: 'green'}}>{newuser? 'succes': 'Loggeed in'}</p>: <p style={{color:'red'}}>{user.error}</p>
      }
    </div>
  );
}

export default Login;
