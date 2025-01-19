import "./App.css";
import "./styles/styles.css";
import Header from "./components/Header";
import MenuProvider from "./context/MenuContext";
import CurrentView from "./views/CurrentView";

function App() {

	const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

	return (
		<div className="App" id="home">
			<MenuProvider>
				<Header />
				<CurrentView />
			</MenuProvider>
		</div>
	);
}

export default App;