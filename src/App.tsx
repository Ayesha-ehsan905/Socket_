import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { globalStyles } from "./styles";
import { routes } from "./utilis/constant";
import "./assets/font/style.css";

const SplashScreen = lazy(() => import("./views/SplashScreen"));
const Dashboard = lazy(() => import("./views/Dashboard"));

function App() {
  globalStyles();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SplashScreen />} />
          <Route path={routes.dashboard} element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
