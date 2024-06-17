interface CardProps {
  icon: JSX.Element;
  title: string;
  number: number;
  color?: string;
  textColor?: string;
  currency?: boolean;
}

const Card = ({
  icon,
  title,
  number,
  color,
  textColor,
  currency,
}: CardProps) => {
  return (
    <div
      style={{
        backgroundColor: color ? color : "#fff",
        height: "131px",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        paddingLeft: "16px",
      }}
    >
      <div className="w-[41px] h-[41px] rounded-full bg-[#FFFFFF] font-bold flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-[#49494A]">{title}</p>
        <p
          style={{
            color: textColor ? textColor : "#0E0E0E",
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginTop: "4px",
          }}
        >
          {currency && "₦"}
          {number.toLocaleString()}
          {currency && ".00"}
        </p>
      </div>
    </div>
  );
};

export default Card;
