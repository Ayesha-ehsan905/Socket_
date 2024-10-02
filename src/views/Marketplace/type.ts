export type MarketplaceCardProp = {
  imageUrl: string;
  isPadding?: boolean;
};
export type TabItem = {
  label: string;
  component: React.ReactNode;
};

export type TabsProps = {
  tabData: TabItem[];
};
