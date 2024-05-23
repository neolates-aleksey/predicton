interface Props {
  className: string;
}

const IconArrowMenu = ({ className }: Props) => {
  return (
    <svg className={className} width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.00117 0.916626C1.5293 0.916626 1.10389 1.20088 0.923314 1.63683C0.742736 2.07278 0.842551 2.57459 1.17622 2.90825L8.17622 9.90825C8.63183 10.3639 9.37052 10.3639 9.82613 9.90825L16.8261 2.90825C17.1598 2.57459 17.2596 2.07278 17.079 1.63683C16.8985 1.20088 16.473 0.916626 16.0012 0.916626H2.00117Z"
        fill="white"
      />
    </svg>
  );
};

export default IconArrowMenu;
