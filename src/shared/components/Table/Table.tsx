import classNames from "classnames";
import "./Table.scss";

interface ITableColumn {
  heading: string;
  items: string[];
}

interface ITable {
  data: ITableColumn[];
  className?: string;
}

const Table = ({ data, className }: ITable) => {
  return (
    <div className={classNames("table", className)}>
      <div className="table__header">
        {data.map((item: ITableColumn) => (
          <div key={item.heading} className="table__header-item">
            {item.heading}
          </div>
        ))}
      </div>
      <div className="table__body">
        <div className="table__body-column">
          {data[0].items.map((text: string) => (
            <div key={text} className="table__body-item">
              {text}
            </div>
          ))}
        </div>
        <div className="table__body-column">
          {data[1].items.map((text: string) => (
            <div key={text} className="table__body-item">
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
