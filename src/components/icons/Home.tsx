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
          d="M28.6484 11.1799L19.915 4.19319C18.2084 2.8332 15.5417 2.81986 13.8484 4.17986L5.11503 11.1799C3.8617 12.1799 3.1017 14.1799 3.36837 15.7532L5.04837 25.8065C5.43503 28.0599 7.52837 29.8332 9.80836 29.8332H23.9417C26.195 29.8332 28.3284 28.0199 28.715 25.7932L30.395 15.7399C30.635 14.1799 29.875 12.1799 28.6484 11.1799ZM17.875 24.4999C17.875 25.0465 17.4217 25.4999 16.875 25.4999C16.3284 25.4999 15.875 25.0465 15.875 24.4999V20.4999C15.875 19.9532 16.3284 19.4999 16.875 19.4999C17.4217 19.4999 17.875 19.9532 17.875 20.4999V24.4999Z"
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
          d="M16.75 24.5V20.5"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1766 4.25996L4.93661 11.66C3.89661 12.4866 3.22995 14.2333 3.45661 15.54L5.22995 26.1533C5.54995 28.0466 7.36328 29.58 9.28328 29.58H24.2166C26.1233 29.58 27.9499 28.0333 28.2699 26.1533L30.0433 15.54C30.2566 14.2333 29.5899 12.4866 28.5633 11.66L19.3233 4.2733C17.8966 3.12663 15.5899 3.12663 14.1766 4.25996Z"
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
