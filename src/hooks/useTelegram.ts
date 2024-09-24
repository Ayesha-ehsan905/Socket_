import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [chatId, setChatId] = useState<number | null>(null);
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const app = (window as any).Telegram?.WebApp;

      if (app) {
        app.ready();
        const chat_id = app.initDataUnsafe.user;
        if (chat_id) setChatId(chat_id);
      }
    } catch (error) {
      console.error("Error initializing Telegram Web App:", error);
    }
  }, []);
  return {
    chatId,
  };
};
