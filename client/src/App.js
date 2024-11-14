import {AuthProvider} from "./Contexts/AuthContext";
import AppRouter from "./router";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</div>
	);
}

export default App;
