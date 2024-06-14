import { LoadingSpinner } from "../Utils/LoadingSpinner";

interface buttonProps extends React.HTMLProps<HTMLButtonElement> {
  name?: string | undefined;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  altText?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string; //pass 'google' or 'github' as id if using social auth
}

export const Button = ({
  name,
  type,
  className,
  loading,
  disabled,
  onClick,
}: buttonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} flex w-full justify-center items-center rounded-[30px] h-[52px] bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-[#47aa96] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47aa96] transition ease-in duration-200 disabled:cursor-not-allowed disabled:bg-primary disabled:opacity-50`}
    >
      {loading ? <LoadingSpinner /> : `${name}`}
    </button>
  );
};

export const BTN = ({
  text,
  onClick,
  className,
  loading,
  disabled,
}: {
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  className: string;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }  flex w-full justify-center rounded-[30px] px-3 py-3 text-sm font-[500] leading-6 shadow-sm`}
    >
      {loading ? <LoadingSpinner /> : `${text}`}
    </button>
  );
};
