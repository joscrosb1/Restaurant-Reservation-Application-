import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

const TableFinish = ({ table, clickHandler, error }) => {
  const handleFinishClick = (event) => {
    event.preventDefault();
    clickHandler(event, table.table_id);
  };

  return table.reservation_id ? (
    <div>
      <ErrorAlert error={error} />
      <button
        className="btn btn-danger"
        type="button"
        data-table-id-finish={table.table_id}
        onClick={handleFinishClick}
      >
        Finish
      </button>
    </div>
  ) : null;
};

export default TableFinish;