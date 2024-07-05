import { FC } from "react";

interface IDataTableProps {
  tableHeaders: string[];
  tableRows: string[][];
}

const DataTable: FC<IDataTableProps> = ({ tableHeaders, tableRows }) => {
  return (
    <table className="table-auto border-collapse ">
      <caption className="caption-bottom text-gray-500 text-xs my-4">
        Data from Google Analytics API
      </caption>
      <thead className="bg-slate-200">
        <tr>
          {tableHeaders.map((el) => (
            <th
              className="p-3 text-left border border-slate-300"
              scope="col"
              key={el}
            >
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((el) => (
                <td className="p-3 border border-slate-300" key={el}>
                  {el}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
