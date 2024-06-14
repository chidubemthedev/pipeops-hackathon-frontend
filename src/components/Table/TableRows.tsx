import {
  formatDate,
  formatDateByMonth,
  timeDifferenceByHours,
} from "../../util/helpers";
import ProfileIcon from "../../assets/images/male-profile.png";

type ColumnDefinitionType<T, K extends keyof T> = {
  key: any;
  header: string;
  width?: number;
  align?: string;
  formatType?: string;
  type?: string;
};

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  children?: any;
  onCellClicked?: any;
};

const handleData = (row: any, column: any, key?: any) => {
  if (typeof column.key !== "string") {
    const mergedData: any[] = [];

    for (let index = 0; index < column.key.length; index++) {
      const element = column.key[index];
      const columnKeys = element.split(".");

      if (columnKeys.length > 1) {
        const nestedObject = row[columnKeys[0]];

        mergedData.push(nestedObject[columnKeys[1]]);
      }
    }

    return mergedData.join(" ");
  } else {
    const columnKeys = column.key.split(".");

    if (columnKeys.length > 1) {
      const nestedObject = row[columnKeys[0]];

      return nestedObject[columnKeys[1]];
    } else {
      return row[column.key] ? row[column.key] : 0;
    }
  }
};
const handleTimeDiff = (row: any, column: any, key?: any) => {
  const fromDate = row[column.dates[0]];
  const toDate = row[column.dates[1]];
  const dateDifference = timeDifferenceByHours(fromDate, toDate);
  return dateDifference;
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
  children,
  onCellClicked,
}: TableRowsProps<T, K>): JSX.Element => {
  const findChildByKey = (key: any) => {
    if (children?.props) {
      if (!children?.props?.children.length) {
        if (children?.props?.children.key === key) {
          return children?.props?.children;
        }
      } else {
        const childByKey = children?.props?.children?.find(
          (child: { key: any }) => child.key === key
        );
        return childByKey;
      }
    }
  };

  const hasChildProp = (key: any) => {
    if (!children?.props?.children.length) {
      if (children?.props?.children.key === key) {
        return children?.props?.children.key === key;
      }

      return false;
    } else {
      const childByKey = children?.props?.children?.find(
        (child: { key: any }) => child.key === key
      );

      return childByKey ? true : false;
    }
  };

  const handleStatusClass = (data: any, key: any, index: any) => {
    return `td-${data.status.toLowerCase()}`;
  };

  const cellClicked = (
    index2: number,
    column: ColumnDefinitionType<T, K>,
    index: number,
    row: any
  ) => {
    onCellClicked({ columnIndex: index2, column, rowIndex: index, row });
  };

  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`} className="border-b border-[#E8EAED]">
        {columns.map((column, index2) => {
          if (hasChildProp(column.key)) {
            return (
              <td
                key={`cell-${index2} `}
                className={`text-${
                  column.align ? column.align : "left"
                }  text-sm p-5  text-[#5E5E5E] bg-white`}
                onClick={() => cellClicked(index2, column, index, row)}
              >
                {findChildByKey(column.key)}
              </td>
            );
          } else {
            return (
              <td
                key={`cell-${index2} `}
                className={`text-${
                  column.align ? column.align : "left"
                }   text-sm p-5  text-[#5E5E5E] bg-white`}
                onClick={() => cellClicked(index2, column, index, row)}
              >
                {column.type === "userProfile" ? (
                  <>
                    <div className="flex gap-2 items-center">
                      <img src={ProfileIcon} alt="" />
                      <div>
                        <div>
                          <p className="text-neutral-600 text-sm">
                            {handleData(row, {
                              key: [
                                "requestedby.firstName",
                                "requestedby.lastName",
                              ],
                            })}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {handleData(row, { key: ["requestedby.email"] })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : column.type === "hubProfile" ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-2 items-center  w-[100px] md:w-full ">
                      <img src={ProfileIcon} alt="" />
                      <div>
                        <div className="text-center md:text-left">
                          <p className="text-neutral-600 text-sm">
                            {handleData(row, { key: ["preferedHub.name"] })}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {handleData(row, { key: ["preferedHub.address"] })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : column.key === "timeDiff" ? (
                  <>
                    <span>{handleTimeDiff(row, column)}</span>
                  </>
                ) : column.key === "status" ? (
                  <>
                    <span
                      className={`${handleStatusClass(
                        row,
                        column.key,
                        index
                      )} `}
                    >
                      {handleData(row, column).toLowerCase()}
                    </span>
                  </>
                ) : column.type === "date" ? (
                  column.formatType === "dateText" ? (
                    <>
                      <span>{formatDate(handleData(row, column))}</span>
                    </>
                  ) : (
                    <>
                      <>
                        <span>{formatDate(handleData(row, column))}</span>
                      </>
                    </>
                  )
                ) : column.key === "type" || column.key === "assetType" ? (
                  <>
                    <span className={`td-${column.key}`}>
                      {handleData(row, column).toLowerCase()}
                    </span>
                  </>
                ) : (
                  <>
                    <span className={`td-${column.key}`}>
                      {handleData(row, column)}
                    </span>
                  </>
                )}
              </td>
            );
          }
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableRows;
