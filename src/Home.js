import { initializeApp } from "firebase/app";
import { getDtatabase, ref, get, child, onValue, getDatabase} from "firebase/database"
import React, { useEffect, useState } from 'react';
import { map } from '@firebase/util';
import pic from './bilde3.png';

const firebaseConfig = {
    apiKey: "AIzaSyB2xEC3xlXWnlFNZDy2akIdKfW_Vp6vsLw",
    authDomain: "nett-e5517.firebaseapp.com",
    databaseURL: "https://nett-e5517-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "nett-e5517",
    storageBucket: "nett-e5517.appspot.com",
    messagingSenderId: "816324436323",
    appId: "1:816324436323:web:a60ee3029d01ae12e73356"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function Home(){
    const [list, setList] = useState();

    useEffect(() => {
      onValue(ref(db, "Highscore"), snapshot => {
        const data = snapshot.val()
        let tempName = [];
        let tempScore = []; 

        if (data !== null){
          for (let [key, value] of Object.entries(data)){
            tempName.push(key);
            tempScore.push(value);
          }
        }

          var listt = [];
          for (let i = 0; i < tempName.length; i++)
          {
            listt.push({name: tempName[i], score: tempScore[i], rank: i});
          }
          
          listt.sort(function (a,b){
            return b.score-a.score;
          })
          
          for (let i = 0; i < listt.length; i++)
          {
            listt[i].rank = (i+1);
          }
         
          setList(listt)
          console.log(list);

        })}, [])
        
    return(
        <div className="App">
        <section className = "mainPage">

    <h1 className ="title-main"> Småfigurer </h1>
    
    <div class="container">
    <div class="d-sm-flex align-items-center justify-content-between">
      <div>
        <p className="introTxt">
          Vår innovasjon skal motivere andre til å gå. 
        </p>
      </div>
        <img src={pic} width = "400" height="400"/>
    </div>
  </div>

  </section>

  <section>
  <div className="wholeContainer">
        <h1 className= "tableHeader">HIGHSCORE</h1>

    <div className ="table-container" >
      <div style={{width: "100vw"}}>
          <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", borderBottom: "solid black 2px", textAlign: "center"}}>
            <h2>Rank</h2>
            <h2>Name</h2>
            <h2>Score</h2>
          </div>
          {list?.map(e => {
            return (
              
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", borderBottom: "solid black 2px", textAlign: "center", fontWeight: 600}}>
                  <p style={{width: "100px"}}>{e.rank}</p>
                  <p style={{width: "100px"}}>{e.name}</p>
                  <p style={{width: "100px"}}>{e.score}</p>
                </div>
            )
          })}

      </div>
      
    </div>
    </div>
    </section>
    
    </div>
    )
}

export default Home; 