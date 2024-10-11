import { Provider } from "react-redux";
import "./App.css";
import BasicDetails from "./Components/BasicDetails";
import Experience from "./Components/Experience";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Resume from "./Components/Resume";
import Skills from "./Components/Skills";
import store from "./Redux/Store/Store";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Navbar />
				<BasicDetails />
				<Resume />
				<Projects />
				<Skills />
				<Experience />
				<Login />
			</Provider>
		</div>
	);
}

export default App;
