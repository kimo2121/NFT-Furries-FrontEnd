import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MobileNavBar from "./components/MobileNavBar/MobileNavBar";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEagerConnect } from "hooks/useEagerConnect";

function App() {
  useEagerConnect();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
        }}
      />
      <Router>
        {window.innerWidth > 1026 ? <Navbar /> : <MobileNavBar />}
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
