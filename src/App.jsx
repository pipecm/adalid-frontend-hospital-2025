import "./App.css";
import "./styles/styles.css";
import Header from "./components/Header";
import CurrentViewProvider from "./context/CurrentViewContext";
import CurrentView from "./views/CurrentView";

function App() {
	return (
		<div className="App" id="home">
			<CurrentViewProvider>
				<Header />
				<CurrentView />
			</CurrentViewProvider>
		</div>
	);
}

export default App;