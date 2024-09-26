import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { globalStyles } from "./styles";
import { routes } from "./utilis/constant";
import "./assets/font/Baloo/font.css";
import "./assets/font/Gilmer/font.css";
import Alert from "./components/Popup";
import { SocketEvents } from "./utilis/enum";
import { useSocketContext } from "./components/SocketContext/SocketContext";
const SplashScreen = lazy(() => import("./views/SplashScreen"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const MatchingOpponent = lazy(() => import("./views/MatchingOpponent"));
const OneVsOne = lazy(() => import("./views/OneVsOne"));
function App() {
  globalStyles();
  const { socket, connectSocket, disconnectSocketEvent } = useSocketContext();
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  useEffect(() => {
    connectSocket();

    // Listen for socket error event
    socket.on(SocketEvents.ERROR, (data) => {
      setErrorAlert(data?.message); // Set the error message to trigger the alert
    });

    return () => {
      disconnectSocketEvent(SocketEvents.ERROR); // Clean up listener on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            <Route path={routes.One_one} element={<OneVsOne />} />
          </Route>
        </Routes>
      </Suspense>
      {errorAlert && (
        <Alert
          // isClose={true}
          open={!!errorAlert}
          onClose={() => setErrorAlert(null)}
          severity="error"
          text={errorAlert}
        />
      )}
    </Router>
  );
}

export default App;
