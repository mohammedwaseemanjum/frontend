import type { TableContextValue, BodyProps } from "@component/Table/Generic/types";

const createBody = <T,>(
  useTableContext: (
    part: string,
  ) => TableContextValue<T>,
) => {
  return function Body({ children }: BodyProps<T>) {
    const { rows } = useTableContext("Body");

    return (
      <tbody>
        {rows.map((row, index) => children(row, index))}
      </tbody>
    );
  };
};

export { createBody }