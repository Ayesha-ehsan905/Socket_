import { Outlet } from "react-router-dom";
import { ErrorScreen } from "../../views/Error";
import { useOrientation } from "../../hooks/useOrientation";

export function Layout() {
  const isPortraitAndSmallScreen = useOrientation();

  return (
    <>
      {isPortraitAndSmallScreen ? (
        <>
          <Outlet />
        </>
      ) : (
        <ErrorScreen />
      )}
    </>
  );
}
