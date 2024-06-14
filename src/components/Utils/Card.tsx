interface CardProps {
  icon: JSX.Element;
  title: string;
  number: number;
}

const Card = ({ icon, title, number }: CardProps) => {
  return (
    <div className="h-[131px] rounded-[10px] flex gap-x-[16px] bg-[#fff] pt-5 pl-6">
      <div className="w-[41px] h-[41px] rounded-full bg-[#D0F5EE80] font-bold flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-[#49494A]">{title}</p>
        <p className="text-3xl text-[#0E0E0E] font-bold mt-4">{number}</p>
      </div>
    </div>
  );
};

export default Card;
