import { useEffect, useState } from "react";

export const useOrientation = () => {
  const [isPortraitAndSmallScreen, setIsPortraitAndSmallScreen] = useState(
    window.innerHeight > window.innerWidth && window.innerWidth <= 500
  );

  const handleOrientationChange = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isSmallScreen = window.innerWidth <= 500;
    setIsPortraitAndSmallScreen(isPortrait && isSmallScreen);
  };

  useEffect(() => {
    // Listen for resize event to check width and orientation
    window.addEventListener("resize", handleOrientationChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return isPortraitAndSmallScreen;
};
