import React from 'react';
import TableFinish from './TableFinish';

const TablesList = ({ tables, clickHandler, error }) => {
  const tableCards = tables.map((table) => (
    <div key={table.table_id} className="col-md-4 mb-3">
      <div className="card">
        <div className={`card-header ${table.reservation_id === null ? 'bg-success' : 'bg-warning'}`}>
          <h5 className="card-title">Table Name: {table.table_name}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">
            Capacity: {table.capacity}<br/>
            Table Status: <span data-table-id-status={table.table_id}>{table.reservation_id === null ? 'Free' : 'Occupied'}</span>
          </p>
          <TableFinish table={table} clickHandler={clickHandler} error={error} />
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h4>Tables</h4>
      <div className="row">{tableCards}</div>
    </div>
  );
};

export default TablesList;