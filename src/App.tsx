import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { globalStyles } from "./styles";
import { routes } from "./utilis/constant";
import "./assets/font/Baloo/font.css";
import "./assets/font/Gilmer/font.css";
// import { useSocketContext } from "./components/SocketContext/useSocketContext";
// import { SocketEvents } from "./utilis/enum";
import Alert from "./components/Popup";
const SplashScreen = lazy(() => import("./views/SplashScreen"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const MatchingOpponent = lazy(() => import("./views/MatchingOpponent"));
const OneVsOne = lazy(() => import("./views/OneVsOne"));
function App() {
  globalStyles();
  // const { socket } = useSocketContext();
  const [errorAlert, setErrorAlert] = useState(false);

  // useEffect(() => {
  //   if (!socket.connected) setErrorAlert(true);
  //   setErrorAlert(false);
  //   // Listen for socket disconnection event
  //   socket.on(SocketEvents.DISCONNECT, (data) => {
  //     console.log("Socket disconnected", data);
  //     setErrorAlert(true);
  //     // You can also handle reconnection logic here, or show a notification to the user
  //   });

  //   // Clean up the listener on component unmount
  //   return () => {
  //     socket.off(SocketEvents.DISCONNECT);
  //   };
  // }, [socket]);
  console.log(errorAlert);
  return (
    <>
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
            isClose={true}
            open={errorAlert}
            onClose={() => setErrorAlert(false)}
            severity="error"
            text={"socket even disconnected"}
          />
        )}
      </Router>
    </>
  );
}

export default App;
