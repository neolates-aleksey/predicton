import { useRecoilState } from "recoil";
import { userState } from "../../../store/userState";
import "./DesktopBalance.scss";
import { formatNumber } from "../../../shared/helpers/formatNumber";

const DesktopBalance = () => {
  const [userInfo] = useRecoilState(userState);

  return (
    <div className="desktop-balance">
      <p className="desktop-balance__title">My total balance</p>
      <p className="desktop-balance__count">
        {userInfo?.user.point_balance &&
          formatNumber(userInfo?.user.point_balance)}
      </p>
    </div>
  );
};

export default DesktopBalance;
