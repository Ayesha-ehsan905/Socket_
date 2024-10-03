import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import { useAuth } from "./components/contexts/AuthContext/useAuth";
import { UserDTO } from "./components/contexts/AuthContext/type";
function App() {
  globalStyles();
  const { userData } = useAuth();

  const [errorAlert, setErrorAlert] = useState(false);

  return (
    <>
      <Router>
        {/*  AuthRedirect if token is null,app reload */}
        <AuthRedirect userData={userData} /> {/* emit current path to socket */}
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
// New AuthRedirect Component
const AuthRedirect = ({ userData }: { userData: UserDTO }) => {
  const navigate = useNavigate(); // useNavigate can be used here because this component is inside Router

  useEffect(() => {
    if (!userData?.token) {
      navigate("/"); // Redirect to the splash screen if token is missing
    }
  }, [userData, navigate]);

  return null;
};
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
