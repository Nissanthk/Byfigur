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

    // const [keyID, setKeyID] = useState(); 

    // useEffect(() => {
    //     onValue(ref(db, "ID"), snapshot => {
    //         const data1 = snapshot.val(); 
    //         let tempID = []; 
    //         let tempName1 = []; 

    //         if (data1 !== null){
    //             for (let [key3, value3] of Object.entries(data1)){
    //               tempID.push(key);
    //               tempName1.push(value);
    //             }
    //         }
            
    //         var listt1 = []; 

    //         for (let i = 0; tempID.length; i++){
    //             listt1.push({ID : tempID[i], name : tempName1[i]}); 
    //         }

    //         setKeyID(listt1); 
    //     })
    // }, [])

    // // const unRegister = () => {
    // //     for (let i = 0; i < keyID.length; i++){
    // //         if (keyID.name == newStr){
    // //             remove(ref(db, "ID" + keyID.ID))
    // //         }
    // //     }
    // // }

    // let aaa =225216938; 
    // let aa = "Available"; 

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