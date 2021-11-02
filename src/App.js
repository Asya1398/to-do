import './App.css';
import axios from "axios";
import {useEffect,useState} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FormAdd from './components/FormAdd';
import {UserContext} from './components/UserContext';
import FormEdit from './components/FormEdit';

function App() {
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000").then((response)=>{
      setUsers(response.data)
    })
  },[]);

  return (
      <div className="App">
        <Router>
          <UserContext.Provider value={{ users,setUsers }}>
            <Route path='/' exact component={ FormAdd } />
            <Route path='/edit/:id'  component={ FormEdit } />
          </UserContext.Provider>
        </Router>
      </div>
  );
}

export default App;
