import { EmptyIcon } from "../../assets/icons";

export const EmptyTable = ({ text, info }: { text: string; info: string }) => {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
      <EmptyIcon />
      <div className="flex gap-1 flex-col items-center justify-center">
        <p className="text-sm text-secondary-general font-medium">
          {text ? text : "No Data Found!"}{" "}
        </p>
        {info && (
          <p className="text-sm text-secondary-300 font-[400]">{info} </p>
        )}
      </div>
    </div>
  );
};
