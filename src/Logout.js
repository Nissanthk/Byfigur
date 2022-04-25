import React, { useEffect, useState } from 'react';
import googlePic from "./google_icon.png";
import { ref, get, child, onValue, getDatabase, push, set, update, remove} from "firebase/database"
import firebase from 'firebase/app'; 

const db = getDatabase();

function Logout(){

    const [key, setKey] = useState(); 
    const [value, setValue] = useState(""); 

    const signOutWithGoogle = () =>{
        localStorage.removeItem("account"); 
        localStorage.removeItem("googleUserName"); 
        localStorage.removeItem("idToken"); 
        window.location="./login";
    }

    useEffect(() => {
        onValue(ref(db, "noID"), snapshot => {
            const data = snapshot.val(); 
            let [key1, value1] = Object.entries(data)[0]
            console.log(key1);
            console.log(value1);

            if (Object.entries(data) != 0){
                setKey(key1); 
                setValue(value1); 
            }
            else {
                setKey(key1 + "none");
            }

        })
    }, [])

    const str = localStorage.getItem("googleUserName");
    const newStr = str.slice(0, str.indexOf(' ')); 
    console.log(newStr); 
    
    const pushData = () => {

        if (key.length != 0){
            update(ref(db, "ID"), {
                [key] : newStr
            })
            remove(ref(db, "noID"));
            window.location="./logout";
        }
    }

    const resetButton = () => {
        remove(ref(db, "noID"));
        window.location="./logout";
    }

    return (
    <div className="pageColor">

        <div>
            <p className = "newIDtext1">If NFC is detected, click register button to register your account to the given NFC.</p>
            <p className="newIDtext2"> Click reset button to remove detected NFC.</p>
            <h1 className ="newID">
                 NFC detected: {key}
            </h1>
        </div>

        <div>

            <button className="resetButton" onClick={resetButton}>
                Reset
            </button>

            <button className="registerButton" onClick={pushData}>
                Register 
            </button>

        </div>

        <div>
        <button className="googleButtonLogOut" onClick={signOutWithGoogle}>
            <img src={googlePic} className="googleIcon"></img>
            <h1>Logout from Google</h1>
        </button>
        </div>
    </div>
    )
}

export default Logout; 
