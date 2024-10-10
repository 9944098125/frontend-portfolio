import "./App.css";
import BasicDetails from "./Components/BasicDetails";
import Experience from "./Components/Experience";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Resume from "./Components/Resume";
import Skills from "./Components/Skills";

function App() {
	return (
		<div className="App">
			<Navbar />
			<BasicDetails />
			<Resume />
			<Projects />
			<Skills />
			<Experience />
			<Login />
		</div>
	);
}

export default App;
