import { Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<div>
							This is the generated root route. <Link to="/page-2">Click here for page 2.</Link>
						</div>
					}
				/>
			</Routes>
		</>
	);
}
