import { Outlet } from "react-router-dom";
import { ErrorScreen } from "../../views/Error";

const useIsMobile = () => {
  const mobileWidth = 500;
  return window.matchMedia(`(max-width: ${mobileWidth}px)`).matches;
};
export function Layout() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <>
          <Outlet />
        </>
      ) : (
        <ErrorScreen />
      )}
    </>
  );
}
