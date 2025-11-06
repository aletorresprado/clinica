import React from "react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./components/Navbar"
import Contacto from "./components/Contacto";
import Profesionales from "./components/Profesionales";

function App() {
  	return (
		<>
			<Router>
				<Navbar />
      			<Banner />
				<Profesionales />
				<Contacto />
      			<Footer />
			</Router>
    	</>
  );
}

export default App;
