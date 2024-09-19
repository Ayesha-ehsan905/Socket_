import { Box } from "../../components/elements/Box";
import LeaderBoard from "./component/LeaderBoard";

import UserCard from "./component/UserCard";

const Dashboard = () => {
  return (
    <Box>
      <UserCard />
      <LeaderBoard />
    </Box>
  );
};

export default Dashboard;
