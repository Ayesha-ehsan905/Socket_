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
import { changeBackgroundImage, getCurrentPath } from "./utilis/function";
import { COLLECTABLE_TYPE, SocketEvents } from "./utilis/enum";
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
import { Game_Resumedprops } from "./utilis/type";
import useNetworkStatus from "./hooks/useNetworkStatus";
import { Overlay } from "./components/Modal/Modal";
import { Spinner } from "./components/Loader/Spinner";
import { Flex } from "./components/Flex/Flex";
import { Box } from "./components/elements";
import { axios } from "./lib/axios";
import { endpoint } from "./utilis/endpoints";
function App() {
  globalStyles();
  const { userData, setUserData } = useAuth();
  const isOnline = useNetworkStatus();
  const [isApiResponseFetched, setIsApiResponseFetched] = useState(false);

  const [errorAlert, setErrorAlert] = useState(false);
  const { chatId } = useTelegram();
  useEffect(() => {
    // Ensure Telegram WebApp is available and ready
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;

    if (!app) {
      console.warn("Telegram WebApp is not available.");
      return;
    }

    app.ready();
    app.setPreferredOrientation("portrait");
  }, []);
  useEffect(() => {
    //fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(endpoint.userAuth, {
          chatId: chatId?.toString(),
        });
        if (response) {
          //fetched then move a head
          setIsApiResponseFetched(true);
          //set the user auth context
          setUserData(response?.data?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfileData();
  }, [chatId, setUserData]);

  useEffect(() => {
    if (userData.token) {
      const getUserCollectibles = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${userData.token}` },
          };
          const collectiblesResponse = await axios.get(
            endpoint.userCollectables,
            config
          );
          const appliedBackgrounds = collectiblesResponse.data.data.filter(
            (collectible: { type: COLLECTABLE_TYPE; is_applied: boolean }) =>
              collectible.type === COLLECTABLE_TYPE.BACKGROUND &&
              collectible.is_applied
          );
          if (appliedBackgrounds.length > 0)
            changeBackgroundImage(appliedBackgrounds[0]?.image_url);
        } catch (error) {
          console.error("Error Applying Collectable:", error);
        }
      };
      getUserCollectibles();
    }
  }, [userData]);

  return (
    <>
      <Router>
        {/*  AuthRedirect if token is null,app reload */}
        {/* emit current path to socket */}
        <AuthRedirect userData={userData} />
        <PathLogger />
        <GameResumed />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <SplashScreen isApiResponseFetched={isApiResponseFetched} />
              }
            />
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
        {!isOnline && (
          <Overlay>
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              css={{ background: "$white", padding: "1rem" }}
            >
              <Spinner />
              <Box
                as="p"
                css={{
                  fontSize: "$14",
                  fontFamily: "$Gilmer",
                  fontWeight: "$bold",
                }}
              >
                Lost Connection
              </Box>
            </Flex>
          </Overlay> // Show overlay when disconnected
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
//game reconnection if required
const GameResumed = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("game resumed reconnected");
    socket.on(SocketEvents.GAME_RESUMED, handleGameResumed);
    return () => {
      socket.off(SocketEvents.GAME_RESUMED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameResumed = (data: Game_Resumedprops) => {
    console.log("handleGameResumed", data);

    navigate(routes.One_one, { state: { roomeName: data?.roomName } });
  };
  return <></>;
};
export default App;
