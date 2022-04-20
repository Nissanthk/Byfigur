import './App.css';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';
import Logout from './Logout';
import {Routes, Route } from 'react-router-dom'; 

function App() {
  
  if (localStorage.getItem("account") == "true"){
    return(
      <div>
        <NavBar />
  
        <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/Logout" element={<Logout />} />
        </Routes>
      </div>
    )
  } else {
  return(
    <div>
      <NavBar />

      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/Login" element={<Login />} />
      </Routes>
    </div>
  )
  }
};

export default App;

