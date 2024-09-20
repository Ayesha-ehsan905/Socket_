import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { globalStyles } from "./styles";
import { routes } from "./utilis/constant";
import "./assets/font/Baloo/font.css";
import "./assets/font/Gilmer/font.css";
const SplashScreen = lazy(() => import("./views/SplashScreen"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const MatchingOpponent = lazy(() => import("./views/MatchingOpponent"));

function App() {
  globalStyles();
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SplashScreen />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route
              path={routes.matching_screen}
              element={<MatchingOpponent />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
