export const formatDate = (date: any) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formatDateByMonth = (date: any) => {
  const newDate = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    newDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
    newDate
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(newDate);
  return `${month} ${day},  ${year}`;
};
export const formatDateByMonthAndYear = (date: any) => {
  const newDate = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    newDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
    newDate
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(newDate);
  return `${month}  ${year}`;
};

export const filterByDate = (data: any) => {
  if (data) {
    const sortedData = data.sort((a: any, b: any) => {
      const currentDate = new Date(a.createdAt);
      const nextDate = new Date(b.createdAt);
      return nextDate.getTime() - currentDate.getTime();
    });
    return sortedData;
  }
};

export const timeDifferenceByHours = (fromDate: any, toDate: any) => {
  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);

  const differenceInTime = (date2.getTime() - date1.getTime()) / 3600000;

  return formatHours(differenceInTime);
};

const formatHours = (hours: any) => {
  if (hours < 12) {
    return `${hours} hours`;
  } else {
    return `${Math.round(hours / 24)} days`;
  }
};

export const filterByDateRange = (data: any, fromDate: any, toDate: any) => {
  if (data) {
    const filteredData = data.filter((item: any) => {
      let from = new Date(fromDate);
      from = new Date(
        from.getTime() + Math.abs(from.getTimezoneOffset() * 60000)
      );
      let to = new Date(toDate);
      to = new Date(to.getTime() + Math.abs(to.getTimezoneOffset() * 60000));

      const currentDate = new Date(item.createdAt);
      return (
        currentDate.getTime() >= from.getTime() &&
        currentDate.getTime() <= to.getTime()
      );
    });

    return filteredData;
  }
};

export const appNavs = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: "/icons/home-inactive.svg",
    activeIcon: "/icons/home-active.svg",
    roles: ["SUPER", "USER"],
  },
  {
    name: "Orders",
    link: "/orders",
    icon: "/icons/orders-inactive.svg",
    activeIcon: "/icons/orders-active.svg",
    roles: ["USER"],
    hasChildren: true,
    children: [
      {
        name: "Create Order",
        link: "/orders/create",
        roles: ["USER"],
      },
      {
        name: "Manage Orders",
        link: "/manage-orders",
        roles: ["SUPER", "USER"],
      },
    ],
  },
  {
    name: "Settings",
    link: "/settings",
    icon: "/icons/settings-inactive.svg",
    activeIcon: "/icons/settings-active.svg",
    roles: ["USER", "SUPER"],
  },
];
