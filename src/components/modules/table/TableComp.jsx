import React from "react";

const TableComp = React.memo(
  ({ tableHeading = [], tableData, renderRow, PaginationComp }) => {
    return (
      <div className="mt-4 overflow-x-auto">
        <div className="inline-block min-w-full rounded-lg">
          <table className="min-w-full leading-normal ">
            <thead>
              <tr>
                {tableHeading.map(
                  (
                    { name },
                    index // Destructured item
                  ) => (
                    <th
                      key={index}
                      className={` px-5 py-3 border-b-2   text-left text-xs font-BoldFont bg-white  uppercase tracking-wider`}
                    >
                      {name}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item, index) => renderRow(item, index))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={tableHeading.length} className={`  p-2`}>
                  {PaginationComp}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
);

export default TableComp;
