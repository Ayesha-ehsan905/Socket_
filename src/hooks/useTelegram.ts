import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    // Check if chatId is already in localStorage
    const storedChatId = localStorage.getItem("chatId");

    if (storedChatId) {
      setChatId(Number(storedChatId));
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const app = (window as any).Telegram?.WebApp;

        if (app) {
          app.ready();

          // Check if initDataUnsafe and user exist
          const user = app.initDataUnsafe?.user;

          if (user && user.chat && user.chat.id) {
            const chat_id = user.chat.id;

            // Set the chatId and store it in localStorage
            setChatId(chat_id);
            localStorage.setItem("chatId", chat_id.toString());
          } else {
            console.error("User or chat ID is undefined.");
          }
        } else {
          console.error("Telegram Web App SDK is not available.");
        }
      } catch (error) {
        console.error("Error initializing Telegram Web App:", error);
      }
    }
  }, []);

  return {
    chatId,
  };
};
