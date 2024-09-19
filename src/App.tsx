import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

const SplashScreen = lazy(() => import("./views/SplashScreen/index"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SplashScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
