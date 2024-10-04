import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utilis/constant";

const SplashScreen = ({
  isApiResponseFetched,
}: {
  isApiResponseFetched: boolean;
}) => {
  document.body.style.overflow = "hidden";
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isApiResponseFetched) {
      const timer = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          navigate(routes.dashboard);
          document.body.style.overflow = "scroll";
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
