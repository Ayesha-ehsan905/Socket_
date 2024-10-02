import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { globalStyles } from "./styles";
import { routes } from "./utilis/constant";
import "./assets/font/Baloo/font.css";
import "./assets/font/Gilmer/font.css";
import Alert from "./components/Popup";
import { getCurrentPath } from "./utilis/function";
import { SocketEvents } from "./utilis/enum";
import { useTelegram } from "./hooks/useTelegram";
import SplashScreen from "./views/SplashScreen";
import Dashboard from "./views/Dashboard";
import MatchingOpponent from "./views/MatchingOpponent";
import OneVsOne from "./views/OneVsOne";
import { useSocket } from "./components/contexts/SocketContext/useSocket";
import Marketplace from "./views/Marketplace";
import Profile from "./views/Profile";
function App() {
  globalStyles();
  // const { socket } = useSocket();

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
  return (
    <>
      <Router>
        <PathLogger />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SplashScreen />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route
              path={routes.matching_screen}
              element={<MatchingOpponent />}
            />

            <Route path={routes.One_one} element={<OneVsOne />} />
            <Route path={routes.marketplace} element={<Marketplace />} />
            <Route path={routes.profile} element={<Profile />} />
          </Route>
        </Routes>
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
const PathLogger = () => {
  const location = useLocation();
  const { socket } = useSocket();
  const { chatId } = useTelegram();
  const userCurrentRoute = getCurrentPath(location.pathname);
  //emit current path
  useEffect(() => {
    socket.emit(SocketEvents.ON_SCREEN, {
      chatId,
      onScreen: userCurrentRoute,
    });
  }, [chatId, location, socket, userCurrentRoute]);

  return null;
};
export default App;
