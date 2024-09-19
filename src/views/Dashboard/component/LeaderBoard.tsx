// import { useLocation } from "react-router-dom";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import {
  HomeIcon,
  OneOnOneIcon,
  Profile,
  TournamentIcon,
} from "../../../components/icons";
import { styled } from "../../../styles";

const LeaderBoard = () => {
  // const { pathname } = useLocation();

  const LeaderBoardMenus = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "1v1", icon: <OneOnOneIcon /> },
    { name: "Tournament", icon: <TournamentIcon /> },
    { name: "Profile", icon: <Profile /> },
  ];
  return (
    <Box css={{ margin: "24px 16px 16px" }}>
      <Box as="h2" css={{ fontSize: "$20" }}>
        Leaderboard
      </Box>
      <Flex direction={"column"} wrap={"wrap"}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <LeaderBoardCss key={num} css={{ mt: "15px" }}>
            <Flex direction={"row"} justify={"between"} align={"center"}>
              <Flex justify={"center"} css={{ columnGap: "$3" }}>
                <Box as="img" src="/images/avatar.png" />
                <Box as="span" css={{ fontSize: "$14", alignSelf: "center" }}>
                  John Doe
                </Box>
              </Flex>
              <Box>
                <Box as="span" css={{ color: "$green", mr: "4px" }}>
                  100 Wins
                </Box>
                <Box as="span" css={{ mr: "4px", color: "$grey2" }}>
                  |
                </Box>
                <Box as="span" css={{ color: "$red1" }}>
                  27 Losses
                </Box>
              </Box>
            </Flex>
          </LeaderBoardCss>
        ))}
      </Flex>
      <Box
        css={{
          position: "fixed",
          bottom: "16px", // Adjusted bottom margin to 16px
          left: "16px", // Adjusted left margin to 16px
          right: "16px", // Ensures it does not overflow the viewport
          background: "$white",
          textAlign: "center",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
      >
        <Flex
          direction={"row"}
          align={"center"}
          justify={"between"}
          css={{ padding: "6px  23px" }}
        >
          {LeaderBoardMenus.map((menu, index) => (
            <Flex
              direction={"column"}
              align={"center"}
              // css={{ padding: "6px  12px" }}
              key={index}
            >
              {menu.icon}
              <Box as="span">{menu.name}</Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default LeaderBoard;

const LeaderBoardCss = styled(Box, {
  padding: "8px 16px",
  borderRadius: "50px",
  background: "$grey1",
});
