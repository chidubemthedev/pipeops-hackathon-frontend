interface loaderProps {
  width?: string;
  height?: string;
  type?: string;
  classNames?: string;
  background?: string;
}
export const TableLoader = ({
  width,
  height,
  type,
  background,
  classNames,
}: loaderProps) => {
  const styles = {
    width: width ?? "100%",
    height: height ?? "50px",
    backgroundColor: background,
    margin: "10px 0",
  };

  return (
    <div className={`${classNames} table-line-loader`} style={styles}>
      <slot />
    </div>
  );
};
