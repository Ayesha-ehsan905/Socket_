import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { styled } from "../../../styles";
import { useEffect, useState } from "react";
import Alert from "../../../components/Popup";
import NavigationMenu from "./NavigationMenu";
import { navBottomSpace } from "../../../styles/style";
import { axios } from "../../../lib/axios";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";
import { endpoint } from "../../../utilis/endpoints";
import NoItemsFind from "../../../components/NoItemsFind/NoItemsFind";
import { ILeaderBoardStats } from "../../../utilis/type";
import { obscureName } from "../../../utilis/function";
import APILoader from "../../../components/ApiLoader";

const LeaderBoard = () => {
  const [openTelegramAlert, setOpenTelegramAlert] = useState(false);
  const { userData } = useAuth();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [leaderBoardData, setLeaderBoardData] = useState<ILeaderBoardStats[]>(
    []
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userData.token) return;
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };

        // Apit to get leaderboard data
        const leaderBoardResponse = await axios.get(
          endpoint.leaderBoard,
          config
        );

        setLeaderBoardData(leaderBoardResponse.data.data);
        setLoading(false); // Set loading to false
      } catch (error) {
        //api error handling
        setApiError((error as Error)?.message);
        console.error("Error fetching profile or collectibles data:", error);
        setLoading(false); // Set loading to false
      }
    };

    fetchProfileData();
  }, [userData.token]);

  return (
    <>
      <Box css={{ ...navBottomSpace, margin: "24px 16px 16px" }}>
        <Box
          as="h2"
          css={{
            fontSize: "$20",
            fontWeight: "$bold",
            fontFamily: "$Gilmer",
            margin: "16px 0 8px",
          }}
        >
          Leaderboard
        </Box>

        {loading ? (
          <APILoader />
        ) : (
          <Flex direction={"column"} wrap={"wrap"}>
            {leaderBoardData && leaderBoardData.length > 0 ? (
              leaderBoardData.map((leaderBoard, index: number) => (
                <LeaderBoardCss key={index} css={{ mt: "8px" }}>
                  <Flex direction={"row"} justify={"between"} align={"center"}>
                    <Flex justify={"center"} css={{ columnGap: "$3" }}>
                      <Box
                        as="img"
                        src="/images/avatar_1.png"
                        css={{ width: "40px", height: "40px" }}
                      />
                      <Box
                        as="span"
                        css={{ fontSize: "$14", alignSelf: "center" }}
                      >
                        {obscureName(
                          leaderBoard.first_name,
                          leaderBoard.last_name ?? ""
                        )}
                      </Box>
                    </Flex>
                    <Flex css={{ "@max_xxs": { flexDirection: "column" } }}>
                      <Box as="span" css={{ color: "$green", mr: "4px" }}>
                        {leaderBoard?.totalWins} Wins
                      </Box>
                      <Box
                        as="span"
                        css={{
                          mr: "4px",
                          color: "$grey2",
                          "@max_xxs": { display: "none" },
                        }}
                      >
                        |
                      </Box>
                      <Box as="span" css={{ color: "$red1" }}>
                        {leaderBoard?.totalLosses} Losses
                      </Box>
                    </Flex>
                  </Flex>
                </LeaderBoardCss>
              ))
            ) : (
              <NoItemsFind text={"No Record Found"} />
            )}
          </Flex>
        )}
      </Box>
      <NavigationMenu />
      <Alert
        open={openTelegramAlert}
        onClose={() => setOpenTelegramAlert(false)}
        severity="error"
        text="Please Open In Telegram App"
      />
      {apiError && (
        <Alert
          text={apiError}
          open={!!apiError}
          severity={"error"}
          onClose={() => setApiError("")}
        />
      )}
    </>
  );
};

export default LeaderBoard;

const LeaderBoardCss = styled(Box, {
  padding: "8px 16px",
  borderRadius: "50px",
  background: "$grey1",
});
