import { auth } from "./Authentic.js";
import {signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const LoginBtn = document.getElementById("Login_BtnID");

LoginBtn.addEventListener("click" , async function(){
    const email= document.getElementById("EmailID").value;
    const password = document.getElementById("PasswordID").value;

    try{
        const UserCredentials= await signInWithEmailAndPassword(auth,email,password);
        const user = UserCredentials.user;
        if(user){
             Students_Page();
        }
        alert("Login successful:"+ user.email);
    }
    catch(error){
        alert("Login Failed:  " + error.message);
    };

    document.getElementById("EmailID").value="";
    document.getElementById("PasswordID").value="";
})
