import React from "react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  	return (
    <>
			<Router>
				<Navbar />
      			<Banner />
      			<Footer />
			</Router>
    </>
  );
}

export default App;