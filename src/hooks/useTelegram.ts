import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [chatId, setChatId] = useState<number | null>();

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
          const chat_Id = app.initDataUnsafe?.user?.id;
          if (chat_Id) {
            setChatId(chat_Id);
          }
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
