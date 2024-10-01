import { FixedBgWrapper } from "../../../styles/style";
import { Flex } from "../../../components/Flex/Flex";
import { LeaderBoardMenus, routes } from "../../../utilis/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../../../components/contexts/SocketContext/useSocket";
import { useTelegram } from "../../../hooks/useTelegram";
import { SocketEvents } from "../../../utilis/enum";

const NavigationMenu = () => {
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const { chatId } = useTelegram();
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    if (path === routes.matching_screen) {
      //if socket is not connected connect and then emit the event
      if (socket.connected) {
        socket.connect();
      }
      //search game event
      socket.emit(SocketEvents.SEARCH_GAME, { chatId });
    }
    navigate(path);
  };

  return (
    <FixedBgWrapper
      css={{
        background: "$white",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 16px 0px",
      }}
    >
      <Flex
        direction={"row"}
        align={"center"}
        justify={"between"}
        css={{ padding: "6px  23px", height: "3.75rem" }}
      >
        {LeaderBoardMenus.map((menu, index) => {
          const IconComponent = menu.icon;

          const isActive = pathname === menu.path;
          return (
            <Flex
              direction={"column"}
              align={"center"}
              onClick={() => handleMenuClick(menu.path)}
              css={{ opacity: menu.path === "/" ? 0.3 : 1 }}
              key={index}
            >
              <IconComponent active={isActive} />
            </Flex>
          );
        })}
      </Flex>
    </FixedBgWrapper>
  );
};

export default NavigationMenu;
