const InputTextarea = ({ label, value, handleChange, placeholder }) => {
  return (
    <div className="mb-3">
      <label
        htmlFor="exampleFormControlTextarea1"
        className="form-label fs-4 fw-bold"
      >
        {label}
      </label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      ></textarea>
    </div>
  );
};

export default InputTextarea;
