export type Player = {
  move?: string;
  first_name: string;
  last_name: string;
  chatId: number | string;
};

export interface Collectible {
  id: number;
  image_url: string;
  is_applied: boolean;
  name: string;
  owner_address: string;
  price: string; // If price is a string, otherwise use number
  type: "BACKGROUND" | "HAND_GESTURE"; // If type can only be "BACKGROUND", you can make it a literal type
  created_at: string; // Use Date type if you want to parse this into a Date object
  updated_at: string; // Same here, use Date if you want to handle it as a Date
}

export interface ILeaderBoardStats {
  totalLosses: string; // If it's a string, otherwise change it to number
  user_chatId: string;
  user_created_at: string; // Can be Date if you want to handle it as a Date object
  user_first_name: string;
  user_id: number;
  user_is_blocked: boolean;
  user_last_name: string | null; // Allow null values
  user_mobile_number: string | null;
  user_updated_at: string; // Can be Date if you want to handle it as a Date object
  user_username: string | null;
  totalWins: string; // If it's a string, otherwise change it to number
}

export interface ErrorResponse {
  message: string;
}
