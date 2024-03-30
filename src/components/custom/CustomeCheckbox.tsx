import React, { ChangeEvent } from "react";

// Define a type for the props expected by the CustomCheck component
type CustomCheckProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string; // Optional label prop
};

// Define the CustomCheck component using the props defined above
export const CustomCheck: React.FC<CustomCheckProps> = ({
  value,
  onChange,
  checked,
  label,
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          value={value}
          onChange={onChange}
          checked={checked}
          className="checkbox checkbox-primary size-4 rounded-md"
        />
      </label>
    </div>
  );
};
