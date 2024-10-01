import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utilis/constant";
import { axios } from "../../lib/axios";
import { useAuth } from "../../components/contexts/AuthContext/useAuth";
import { useTelegram } from "../../hooks/useTelegram";

const SplashScreen = () => {
  const { setUserData } = useAuth();
  const [fade, setFade] = useState(true);
  const [isApiResponseFetched, setIsApiResponseFetched] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useTelegram();
  useEffect(() => {
    //user profile api integration
    const fetchProfileData = async () => {
      try {
        const response = await axios.post("users/auth", {
          chatId: chatId?.toString(),
        });
        if (response) {
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
    if (isApiResponseFetched) {
      const timer = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          navigate(routes.dashboard);
        }, 1000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isApiResponseFetched, navigate]);
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        opacity: fade ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <Box
        as="img"
        src="/images/Splash.png"
        alt="SplashScreen"
        css={{ width: "100vw", height: "100vh" }}
      />
    </Box>
  );
};

export default SplashScreen;
