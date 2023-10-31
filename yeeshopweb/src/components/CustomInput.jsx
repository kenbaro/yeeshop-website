import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, className, id, onChange, autoComplete, title, value } = props;
  return (
    <div>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${className}`}
        onChange={onChange}
        autoComplete={autoComplete}
        title = {title}
        value = {value}
      />
    </div>
  );
};

export default CustomInput;
