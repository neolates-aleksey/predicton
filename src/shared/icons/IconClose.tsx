import classNames from "classnames";

interface IIconClose {
  className: string;
}

const IconClose = ({ className }: IIconClose) => {
  return (
    <svg
      className={classNames(className)}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11ZM7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L11 9.58579L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L12.4142 11L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L11 12.4142L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L9.58579 11L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z"
        fill="white"
      />
    </svg>
  );
};

export default IconClose;