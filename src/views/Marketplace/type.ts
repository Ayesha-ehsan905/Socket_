import { Collectible } from "../../utilis/type";

export type MarketplaceCardProp = {
  imageUrl: string;
  isPadding?: boolean;
  name: string;
  price: string;
};
export type TabItem = {
  label: string;
  component: React.ReactNode;
};

export type TabsProps = {
  tabData: TabItem[];
  tabNumber: number;
  setTabNumber: (value: number) => void;
};
export interface ICollectiblesProps {
  collectibles: Collectible[];
  isApiloading?: boolean;
}
