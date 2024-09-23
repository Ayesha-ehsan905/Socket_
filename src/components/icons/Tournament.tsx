import { SvgProps } from "./Home";

const SvgTournament = ({ active, ...props }: SvgProps) => (
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
          d="M16.95 22.5V25.3"
          stroke="#F9C034"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.2833 29.8333H23.6167V28.4999C23.6167 27.0333 22.4167 25.8333 20.95 25.8333H12.95C11.4833 25.8333 10.2833 27.0333 10.2833 28.4999V29.8333Z"
          fill="#F9C034"
          stroke="#F9C034"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M8.94995 29.8333H24.95"
          stroke="#F9C034"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.75 21.8334C11.59 21.8334 7.41663 17.6601 7.41663 12.5001V8.50008C7.41663 5.55341 9.80329 3.16675 12.75 3.16675H20.75C23.6966 3.16675 26.0833 5.55341 26.0833 8.50008V12.5001C26.0833 17.6601 21.91 21.8334 16.75 21.8334Z"
          fill="#F9C034"
          stroke="#F9C034"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.0433 16.0334C7.0433 15.7134 6.1633 15.1267 5.46997 14.4334C4.26997 13.1 3.46997 11.5 3.46997 9.63338C3.46997 7.76672 4.93664 6.30005 6.8033 6.30005H7.66997C7.4033 6.91338 7.26997 7.59338 7.26997 8.30005V12.3C7.26997 13.6334 7.54997 14.8867 8.0433 16.0334Z"
          stroke="#F9C034"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.4567 16.0334C26.4567 15.7134 27.3367 15.1267 28.03 14.4334C29.23 13.1 30.03 11.5 30.03 9.63338C30.03 7.76672 28.5633 6.30005 26.6967 6.30005H25.83C26.0967 6.91338 26.23 7.59338 26.23 8.30005V12.3C26.23 13.6334 25.95 14.8867 25.4567 16.0334Z"
          stroke="#F9C034"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          d="M16.575 22.5V25.3"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.90833 29.8335H23.2417V28.5002C23.2417 27.0335 22.0417 25.8335 20.575 25.8335H12.575C11.1083 25.8335 9.90833 27.0335 9.90833 28.5002V29.8335V29.8335Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M8.57495 29.8335H24.575"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.375 21.8332C11.215 21.8332 7.04163 17.6598 7.04163 12.4998V8.49984C7.04163 5.55317 9.42829 3.1665 12.375 3.1665H20.375C23.3216 3.1665 25.7083 5.55317 25.7083 8.49984V12.4998C25.7083 17.6598 21.535 21.8332 16.375 21.8332Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.6683 16.0331C6.6683 15.7131 5.7883 15.1265 5.09497 14.4331C3.89497 13.0998 3.09497 11.4998 3.09497 9.63314C3.09497 7.76647 4.56164 6.2998 6.4283 6.2998H7.29497C7.0283 6.91314 6.89497 7.59314 6.89497 8.2998V12.2998C6.89497 13.6331 7.17497 14.8865 7.6683 16.0331Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.0817 16.0331C26.0817 15.7131 26.9617 15.1265 27.655 14.4331C28.855 13.0998 29.655 11.4998 29.655 9.63314C29.655 7.76647 28.1883 6.2998 26.3217 6.2998H25.455C25.7217 6.91314 25.855 7.59314 25.855 8.2998V12.2998C25.855 13.6331 25.575 14.8865 25.0817 16.0331Z"
          stroke="#757575"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </>
);
export default SvgTournament;
