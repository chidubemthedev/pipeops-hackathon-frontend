import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { TableLoader } from "./Loader";
import "./table.css";

interface tableProps {
  columns: any[];
  data: any[];
  children?: any;
  loading?: boolean;
  hasFooter?: boolean;
  cellClicked?: any;
}

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  loading?: boolean;
  hasFooter?: boolean;
  cellClicked?: any;
};

const Table = ({
  columns,
  data,
  children,
  loading,
  cellClicked,
  hasFooter,
}: tableProps) => {
  const findByKey = (name: string) => {
    if (children?.length) {
      const foundChild = children?.find(
        (child: { key: any }) => child.key === name
      );
      return foundChild;
    } else {
      return children;
    }
  };

  const onCellClicked = (data: any) => {
    cellClicked(data);
  };

  if (loading) {
    return (
      <>
        {Array.from(Array(5), (e, i) => {
          return (
            <TableLoader
              key={i}
              type={"line"}
              background={"#fff"}
              classNames="rounded-md line"
            />
          );
        })}
      </>
    );
  } else {
    if (data) {
      return (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <TableHeader columns={columns} />

              {data?.length ? (
                <TableRows
                  data={data}
                  columns={columns}
                  onCellClicked={onCellClicked}
                >
                  {children ? findByKey("body") : ""}
                </TableRows>
              ) : (
                ""
              )}
            </table>

            {!data?.length ? findByKey("empty") : ""}

            {hasFooter}

            {hasFooter ? findByKey("footer") : ""}
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
};

export default Table;
