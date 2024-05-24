import PointsMain from "../../modules/PointsMain/PointsMain";
import PointsSystem from "../../modules/PointsSystem/PointsSystem";
import "./Points.scss";

const Points = () => {
  return (
    <div className="points">
      <div className="points__container container">
        <div className="points__content">
          <PointsMain />
          <PointsSystem />
        </div>
      </div>
    </div>
  );
};

export default Points;
