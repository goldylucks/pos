import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { MessageContext } from "./utility/MessageContext";

import Restaurant from "./Restaurant";
import Table from "./Table";
import Manager from "./Manager";
import Message from "./Message";

function App() {
  const [messages, setMessages] = useState([]);

  function newMessage(text, type) {
    const newMsg = messages != null
      ? { key: messages.length + 1, text, type }
      : { key: 1, text, type }
    setMessages(messages.concat(newMsg));
  }

  function deleteMessage(key) {
    const newMsgs = messages.filter((message) => message.key !== key);
    setMessages(newMsgs);
  }

  return (
    <MessageContext.Provider value={{ messages, newMessage, deleteMessage }}>
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

        <div style={{ marginBottom: 80 }}>
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
