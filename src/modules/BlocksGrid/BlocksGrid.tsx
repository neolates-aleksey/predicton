import CurrentBlock from "../CurrentBlock/CurrentBlock";
import NextBlock from "../NextBlock/NextBlock";
import "./BlocksGrid.scss";

const BlocksGrid = () => {
  return (
    <div className="blocks-grid">
      <CurrentBlock />
      <NextBlock />
    </div>
  );
};

export default BlocksGrid;
