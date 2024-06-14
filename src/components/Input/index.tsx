import { ChangeEvent } from "react";
import Calendar from "../../assets/images/calendar.svg";

interface inputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  classes?: string;
  accept?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  required: boolean;
  defaultValue?: string | number;
  togglePassword?: boolean;
  onPasswordToggle?: (e: React.MouseEvent<HTMLElement>) => void;
  min?: string;
  max?: string;
  readOnly?: boolean;
}

export const InputField = ({
  name,
  id,
  placeholder,
  classes,
  accept,
  onChange,
  type,
  required,
  defaultValue,
  togglePassword,
  onPasswordToggle,
  min,
  max,
  readOnly,
}: inputProps) => {
  return (
    <>
      <input
        className={`${classes} block w-full rounded-[12px] border py-3 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
        type={type ? type : "text"}
        name={name}
        id={id}
        min={min}
        max={max}
        accept={accept}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        readOnly={readOnly}
        disabled={readOnly}
      />
      {togglePassword && (
        <span
          onClick={onPasswordToggle}
          className="cursor-pointer absolute top-[20px] right-3 text-black password-toggle"
          data-testid="password-toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3.50026 9.32005C3.22412 8.96658 2.70179 8.89495 2.33361 9.16005C1.96543 9.42514 1.89081 9.92658 2.16695 10.28C2.47966 10.6803 2.88383 11.1218 3.38408 11.5651L2.14007 13.3562C1.88476 13.7239 1.98821 14.2206 2.37113 14.4657C2.75405 14.7108 3.27143 14.6115 3.52675 14.2438L4.69453 12.5624C5.30033 12.9574 5.99286 13.3278 6.77589 13.6416L6.19894 15.5804C6.07251 16.0052 6.32876 16.448 6.77128 16.5694C7.21381 16.6907 7.67503 16.4447 7.80146 16.0199L8.35578 14.1572C9.20807 14.3759 10.144 14.5255 11.1668 14.5786V16.2C11.1668 16.6418 11.5399 17 12.0001 17C12.4603 17 12.8334 16.6418 12.8334 16.2V14.5786C13.8624 14.5251 14.8035 14.374 15.66 14.1532L16.1434 16.0069C16.2551 16.4355 16.7077 16.6959 17.1541 16.5886C17.6006 16.4813 17.8719 16.0469 17.7601 15.6183L17.2427 13.6343C18.0182 13.322 18.7046 12.9543 19.3056 12.5625L20.473 14.2438C20.7283 14.6114 21.2457 14.7108 21.6286 14.4657C22.0116 14.2207 22.1151 13.724 21.8598 13.3564L20.6161 11.5651C21.1164 11.1218 21.5206 10.6803 21.8333 10.28C22.1094 9.92658 22.0348 9.42514 21.6666 9.16005C21.2984 8.89495 20.7761 8.96658 20.5 9.32005C19.3767 10.7579 16.6928 12.9972 12.009 13L12.0001 13L11.9913 13C7.30739 12.9972 4.62357 10.7579 3.50026 9.32005Z"
              fill="#0E0E0E"
            />
          </svg>
        </span>
      )}
      {type === "date" && (
        <div>
          <img
            src={Calendar}
            alt=""
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
      )}
    </>
  );
};
