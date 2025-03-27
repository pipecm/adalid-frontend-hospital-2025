import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then(() => console.log("Service Worker registered successfully!"))
		.catch(error => console.log("Service Worker registration failed: ", error));
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);