const InputText = ({ label, value, handleChange, placeholder }) => {
  return (
    <div className="mb-3">
      <label
        htmlFor="exampleFormControlInput1"
        className="form-label fs-4 fw-bold"
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
};

export default InputText;
