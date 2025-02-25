import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: keyof T;
  inputName: string;
  placeholder: string;
  inputType?: HTMLInputTypeAttribute;
  secured?: boolean;
  passwordToggle?: () => void;
  required?: boolean;
  defaultValue?: any;
};

const CustomInput = <T extends FieldValues>({
  errors,
  register,
  name,
  inputName,
  placeholder,
  inputType,
  passwordToggle,
  secured,
  required = true,
  defaultValue,
}: Props<T>) => {
  return (
    <div className="w-full">
      <p className="text-sm font-normal mb-2 dark:text-white">{inputName}</p>
      <div className={`relative w-full ${!errors[name] && 'mb-5'}`}>
        <input
          type={inputType ?? 'text'}
          className="w-full h-12 px-4 py-3 mb-2 bg-input rounded-[10px] shadow-md placeholder:text-placeholder dark:text-black"
          placeholder={placeholder}
          {...register(name as any, { required: required })}
          defaultValue={defaultValue}
        />

        {secured && (
          <button
            type="button"
            onClick={() => {
              passwordToggle && passwordToggle();
            }}
            className="absolute right-4 top-3"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12.0001C20 10.1901 16.24 8.01508 11.993 8.00008C7.775 7.98508 4 10.1781 4 12.0001C4 13.8251 7.754 16.0061 11.997 16.0001C16.252 15.9941 20 13.8201 20 12.0001ZM12 18.0001C6.958 18.0071 2 15.3141 2 12.0001C2 8.68608 6.984 5.98308 12 6.00008C17.016 6.01708 22 8.68608 22 12.0001C22 15.3141 17.042 17.9931 12 18.0001ZM12 16.0001C10.9391 16.0001 9.92172 15.5787 9.17157 14.8285C8.42143 14.0784 8 13.0609 8 12.0001C8 10.9392 8.42143 9.9218 9.17157 9.17165C9.92172 8.42151 10.9391 8.00008 12 8.00008C13.0609 8.00008 14.0783 8.42151 14.8284 9.17165C15.5786 9.9218 16 10.9392 16 12.0001C16 13.0609 15.5786 14.0784 14.8284 14.8285C14.0783 15.5787 13.0609 16.0001 12 16.0001ZM12 14.0001C12.5304 14.0001 13.0391 13.7894 13.4142 13.4143C13.7893 13.0392 14 12.5305 14 12.0001C14 11.4696 13.7893 10.9609 13.4142 10.5859C13.0391 10.2108 12.5304 10.0001 12 10.0001C11.4696 10.0001 10.9609 10.2108 10.5858 10.5859C10.2107 10.9609 10 11.4696 10 12.0001C10 12.5305 10.2107 13.0392 10.5858 13.4143C10.9609 13.7894 11.4696 14.0001 12 14.0001Z"
                fill="#697077"
              />
            </svg>
          </button>
        )}
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mb-5">This field is required</p>
      )}
    </div>
  );
};

export default CustomInput;

