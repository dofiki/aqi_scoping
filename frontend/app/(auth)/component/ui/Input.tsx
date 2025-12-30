import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, error, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          {...rest}
          className="bg-gray-300 p-2 mt-1 text-gray rounded-2xl w-full outline-0
                   focus:outline-[#476e1e] focus:outline-4 transition-all delay-75 
                   text-[0.9rem] md:text-[1rem]"
          autoComplete={type === "email" ? "email" : "off"}
        />
        {error && <p className="text-red-500 text-[8px] pl-2 pt-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
