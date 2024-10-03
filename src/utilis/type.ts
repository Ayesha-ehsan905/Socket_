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
export interface ErrorResponse {
  message: string;
}
