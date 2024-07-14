import { FC } from "react";

export interface IDataTableProps {
  tableHead: string[];
  tableBody: string[][];
  tableFoot: string[];
}

const DataTable: FC<IDataTableProps> = ({
  tableHead,
  tableBody,
  tableFoot,
}) => {
  return (
    <table className="table-auto border-collapse border border-black bg-white">
      <thead className="bg-orange-200">
        <tr>
          {tableHead.map((el) => (
            <th className="py-3 px-6 text-left" scope="col" key={el}>
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((el, index) => (
                <td
                  className={`py-3 px-6 border border-black ${
                    index === 0 ? "bg-orange-200" : ""
                  }`}
                  key={index}
                >
                  {el}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          {tableFoot.map((el, index) => (
            <td
              className={`py-3 px-6 border border-black ${
                index === 0 ? "bg-orange-200" : ""
              }`}
              key={index}
            >
              {el}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default DataTable;
