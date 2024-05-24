import "./CurrencySwitch.scss";

const TonUsdt = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 12C36 17.9463 31.675 22.8825 25.9991 23.8342C25.9109 16.2338 19.7662 10.0891 12.1658 10.001C13.1175 4.32505 18.0537 0 24 0C30.6274 0 36 5.37257 36 12Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.9991 23.8342C31.675 22.8825 36 17.9463 36 12C36 5.37257 30.6274 0 24 0C18.0537 0 13.1175 4.32505 12.1658 10.001C13.6748 10.0185 15.1265 10.2747 16.4848 10.7338L18.9295 5.56881C18.939 5.54804 18.9543 5.53049 18.9736 5.51828C18.9928 5.50607 19.0151 5.49973 19.0379 5.50001H28.9631C28.9857 5.49995 29.0079 5.50645 29.0269 5.51872C29.046 5.53099 29.0611 5.54852 29.0706 5.56921L31.988 11.7331C31.9991 11.756 32.0026 11.7819 31.9981 11.807C31.9935 11.8321 31.981 11.855 31.9626 11.8725L24.9382 18.6423C25.6025 20.2445 25.9777 21.9969 25.9991 23.8342ZM23.906 16.631H25.0119V12.6989C27.2746 12.5941 28.9772 12.1427 28.9772 11.6017C28.9772 11.0607 27.2762 10.6094 25.0124 10.5041V9.27797H27.803V7.40746H20.2051V9.27797H22.9952V10.5041C20.7274 10.6089 19.0218 11.0607 19.0218 11.6022C19.0218 12.1437 20.7274 12.5951 22.9952 12.7003V15.3327C23.3224 15.7472 23.6266 16.1806 23.906 16.631ZM28.5026 11.506C28.5026 11.9251 27.0106 12.2759 25.0105 12.3651L25.0124 12.3655C24.9558 12.3698 24.6635 12.3873 24.0116 12.3873C23.493 12.3873 23.1249 12.3717 22.9958 12.3655C20.9918 12.2769 19.4961 11.926 19.4961 11.506C19.4961 11.0859 20.9918 10.7355 22.9958 10.6454V12.0161C23.1268 12.0256 23.502 12.0479 24.0206 12.0479C24.6428 12.0479 24.9544 12.0218 25.0105 12.0166V10.6463C27.0101 10.736 28.5026 11.0869 28.5026 11.506Z"
        fill="#50AF95"
      />
      <path d="M12 36C18.6274 36 24 30.6274 24 24C24 17.3726 18.6274 12 12 12C5.37257 12 0 17.3726 0 24C0 30.6274 5.37257 36 12 36Z" fill="#0098EA" />
      <path
        d="M16.0972 18.6975H7.9022C6.39543 18.6975 5.4404 20.3229 6.19846 21.6368L11.2561 30.4032C11.5862 30.9756 12.4133 30.9756 12.7433 30.4032L17.802 21.6368C18.559 20.325 17.604 18.6975 16.0982 18.6975H16.0972ZM11.252 27.7743L10.1505 25.6425L7.49278 20.8891C7.31745 20.5849 7.53401 20.195 7.90117 20.195H11.251V27.7753L11.252 27.7743ZM16.5046 20.8881L13.8479 25.6435L12.7464 27.7743V20.194H16.0962C16.4633 20.194 16.6799 20.5838 16.5046 20.8881Z"
        fill="white"
      />
    </svg>
  );
};

const CurrencySwitch = () => {
  return (
    <div className="currency-switch">
      <TonUsdt />
      <div className="currency-switch__content">
        <p className="currency-switch__name">TON/USDT</p>
        <p className="currency-switch__price">6,2637</p>
      </div>
    </div>
  );
};

export default CurrencySwitch;