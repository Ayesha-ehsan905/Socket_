import { SVGProps } from "react";
export interface SvgProps extends SVGProps<SVGSVGElement> {
  active?: boolean; // Add a color prop
}
const SvgHome = ({ active, ...props }: SvgProps) => (
  <>
    {active ? (
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M30.1132 11.5266L29.7265 7.83329C29.1665 3.80663 27.3398 2.16663 23.4332 2.16663H20.2865H18.3132H14.2598H12.2865H9.08649C5.16649 2.16663 3.35316 3.80663 2.77983 7.87329L2.41983 11.54C2.28649 12.9666 2.67316 14.3533 3.51316 15.4333C4.52649 16.7533 6.08649 17.5 7.81983 17.5C9.49983 17.5 11.1132 16.66 12.1265 15.3133C13.0332 16.66 14.5798 17.5 16.2998 17.5C18.0198 17.5 19.5265 16.7 20.4465 15.3666C21.4732 16.6866 23.0598 17.5 24.7132 17.5C26.4865 17.5 28.0865 16.7133 29.0865 15.3266C29.8865 14.26 30.2465 12.9133 30.1132 11.5266Z"
          fill="#F9C034"
        />
        <path
          d="M15.4331 22.7134C13.7397 22.8867 12.4597 24.3267 12.4597 26.0334V29.6867C12.4597 30.0467 12.753 30.34 13.113 30.34H19.4731C19.8331 30.34 20.1264 30.0467 20.1264 29.6867V26.5C20.1397 23.7134 18.4997 22.3934 15.4331 22.7134Z"
          fill="#F9C034"
        />
        <path
          d="M28.7931 19.7V23.6733C28.7931 27.3533 25.8064 30.34 22.1264 30.34C21.7664 30.34 21.4731 30.0466 21.4731 29.6866V26.5C21.4731 24.7933 20.9531 23.46 19.9397 22.5533C19.0464 21.74 17.8331 21.34 16.3264 21.34C15.9931 21.34 15.6597 21.3533 15.2997 21.3933C12.9264 21.6333 11.1264 23.6333 11.1264 26.0333V29.6866C11.1264 30.0466 10.8331 30.34 10.4731 30.34C6.79306 30.34 3.8064 27.3533 3.8064 23.6733V19.7266C3.8064 18.7933 4.7264 18.1666 5.59306 18.4733C5.95306 18.5933 6.31306 18.6866 6.6864 18.74C6.8464 18.7666 7.01973 18.7933 7.17973 18.7933C7.39306 18.82 7.6064 18.8333 7.81973 18.8333C9.3664 18.8333 10.8864 18.26 12.0864 17.2733C13.2331 18.26 14.7264 18.8333 16.2997 18.8333C17.8864 18.8333 19.3531 18.2866 20.4997 17.3C21.6997 18.2733 23.1931 18.8333 24.7131 18.8333C24.9531 18.8333 25.1931 18.82 25.4197 18.7933C25.5797 18.78 25.7264 18.7666 25.8731 18.74C26.2864 18.6866 26.6597 18.5666 27.0331 18.4466C27.8997 18.1533 28.7931 18.7933 28.7931 19.7Z"
          fill="#F9C034"
        />
      </svg>
    ) : (
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M4.31323 15.46V21.4466C4.31323 27.4333 6.71323 29.8333 12.6999 29.8333H19.8866C25.8732 29.8333 28.2732 27.4333 28.2732 21.4466V15.46"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2998 16.5001C18.7398 16.5001 20.5398 14.5134 20.2998 12.0734L19.4198 3.16675H13.1931L12.2998 12.0734C12.0598 14.5134 13.8598 16.5001 16.2998 16.5001Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.7131 16.5001C27.4065 16.5001 29.3798 14.3134 29.1131 11.6334L28.7398 7.96675C28.2598 4.50008 26.9265 3.16675 23.4331 3.16675H19.3665L20.2998 12.5134C20.5265 14.7134 22.5131 16.5001 24.7131 16.5001Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.81989 16.5001C10.0199 16.5001 12.0066 14.7134 12.2199 12.5134L12.5132 9.56675L13.1532 3.16675H9.08656C5.59323 3.16675 4.25989 4.50008 3.77989 7.96675L3.41989 11.6334C3.15323 14.3134 5.12656 16.5001 7.81989 16.5001Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2999 23.1667C14.0732 23.1667 12.9666 24.2734 12.9666 26.5001V29.8334H19.6332V26.5001C19.6332 24.2734 18.5266 23.1667 16.2999 23.1667Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </>
);
export default SvgHome;
