import { Box } from "../../../components/elements/Box";
import { keyframes, styled } from "../../../styles";

const LoadingDots = () => {
  return (
    <>
    <Box as="span" css={{ textAlign: "center", mt: "1rem", fontSize: "$20px" }}>
      Sharpening your scissors
      <Dot className="dot-one">.</Dot>
      <Dot className="dot-two">.</Dot>
      <Dot className="dot-three">.</Dot>
     
    </Box>
    <Box as="p" css={{ textAlign: "center", mt: "1rem", fontSize: "$20px" ,margin:0}}>
      stay ready!
    </Box>
    </>
  );
};
const dotOneAnimation = keyframes({
  "0%": { opacity: 0 },
  "15%": { opacity: 0 },
  "25%": { opacity: 1 },
  "100%": { opacity: 1 },
});

const dotTwoAnimation = keyframes({
  "0%": { opacity: 0 },
  "25%": { opacity: 0 },
  "50%": { opacity: 1 },
  "100%": { opacity: 1 },
});

const dotThreeAnimation = keyframes({
  "0%": { opacity: 0 },
  "50%": { opacity: 0 },
  "75%": { opacity: 1 },
  "100%": { opacity: 1 },
});

const Dot = styled("span", {
  opacity: 0,
  fontSize: "$20",
  "&.dot-one": {
    animation: `${dotOneAnimation} 3s infinite linear`,
  },
  "&.dot-two": {
    animation: `${dotTwoAnimation} 3s infinite linear`,
  },
  "&.dot-three": {
    animation: `${dotThreeAnimation} 3s infinite linear`,
  },
});
export default LoadingDots;
