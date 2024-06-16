import './OutlineButton.css';

const OutlineButton = ({ desc, handleClick, className }) => {
  return (
    <button
      className={`btn btn-lg btn-outline-${className}`}
      onClick={handleClick}
    >
      {desc}
    </button>
  );
};

export default OutlineButton;
