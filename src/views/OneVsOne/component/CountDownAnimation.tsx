import { useEffect, useState } from "react";
import { keyframes, styled } from "../../../styles";
const Countdown = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000); // Decrease count every second
      return () => clearTimeout(timer); // Cleanup the timeout
    }
  }, [count]);

  return (
    <CountdownContainer>
      {count > 0 ? (
        <CountNumber key={count}>{count}</CountNumber> // Show countdown numbers
      ) : (
        <GameStartText>Game Starting</GameStartText> // Show game start message
      )}
    </CountdownContainer>
  );
};

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.5)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});

// Stitches version of CountdownContainer
const CountdownContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "$Gilmer",
});

// Stitches version of CountNumber
const CountNumber = styled("div", {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "$primary",
  animation: `${fadeIn} 1s ease-in-out`,
});

// Stitches version of GameStartText
const GameStartText = styled("div", {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "$secondary",
  animation: `${fadeIn} 1s ease-in-out`,
});
export default Countdown;
