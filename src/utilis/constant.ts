import {
  HomeIcon,
  MarketplaceIcon,
  OneOnOneIcon,
  ProfileIcon,
  TournamentIcon,
} from "../components/icons";

export const socket_url = import.meta.env.VITE_SOCKET_URL;
export const API_URL = import.meta.env.VITE_API_URL;
export const routes = {
  dashboard: "/home",
  matching_screen: "/matching-screen",
  One_one: "/1v1",
  marketplace: "/marketplace",
};
export const LeaderBoardMenus = [
  { name: "Home", icon: HomeIcon, path: routes.dashboard },
  { name: "1v1", icon: OneOnOneIcon, path: routes.matching_screen },
  { name: "Tournament", icon: TournamentIcon, path: "/" },
  { name: "MarketPlace", icon: MarketplaceIcon, path: routes.marketplace },
  { name: "Profile", icon: ProfileIcon, path: "/" },
];
