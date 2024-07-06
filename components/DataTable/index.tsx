import { FC } from "react";

interface IDataTableProps {
  tableHeaders: string[];
  tableRows: string[][];
}

const DataTable: FC<IDataTableProps> = ({ tableHeaders, tableRows }) => {
  return (
    <table className="table-auto border-collapse border border-black">
      <caption className="sr-only caption-bottom text-gray-500 text-xs my-4">
        Data from Google Analytics API
      </caption>
      <thead className="bg-orange-200">
        <tr>
          {tableHeaders.map((el) => (
            <th className="py-3 px-6 text-left" scope="col" key={el}>
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
                <td className="py-3 px-6 border border-black" key={el}>
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
