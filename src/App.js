import React, {useState} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import {MessageContext} from "./utility/MessageContext";

// Components
import Restaurant from "./Restaurant";
import Table from "./Table";
import Manager from "./Manager";
import Message from "./Message";


function App() { 
  const [message, setMessage] = useState([]);

  function newMessage(text, type) {
    if(message != null){
      const push = message.concat([{key: message.length+1, text, type}]);
      setMessage(push);
    }else{
      setMessage([{key: 1,text, type}]);
    }
    
  }

  function deleteMessage(key) {
    const temp = [];
    message.forEach(element => {
      if(element.key !== key){
        temp.push(element);
      } 
    });
    setMessage(temp);
  }

  return (
    <MessageContext.Provider value={{message, newMessage, deleteMessage}}>
    <Router>
      <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-white justify-content-center">
          <Link to="/">
            <button className="btn btn-lg active">
              <i className="fas fa-clipboard"></i>
              מסך הזמנות
            </button>
          </Link>
          <Link to="/manager">
            <button className="btn btn-lg">
              <i className="fas fa-tools" />
              ניהול
            </button>
          </Link>
      </nav>

      <div style={{marginBottom: 80}}>
        <Route exact path="/">
          <Restaurant />
        </Route>
        <Route path="/table/:id">
          <Table />
        </Route>
        <Route path="/manager">
          <Manager />
        </Route>
      </div>

    </Router>

    <Message />
    </MessageContext.Provider>
  );

}

export default App;
