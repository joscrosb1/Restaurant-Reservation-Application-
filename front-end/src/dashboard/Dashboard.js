import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useRouteMatch} from "react-router-dom";
import { listReservations, listTables, finishTable, cancelReservation } from "../utils/api";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import TableFinish from "../tables/TableFinish";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";

function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const route = useRouteMatch();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);

  const loadDashboard = useCallback(async () => {
    try {
      const abortController = new AbortController();
      setReservationsError(null);

      const reservationsData = await listReservations(
        { date: currentDate },
        abortController.signal
      );
      setReservations(reservationsData);

      const tablesData = await listTables(abortController.signal);
      setTables(tablesData);
    } catch (error) {
      setReservationsError(error);
    }
  }, [currentDate]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const getDate = () => {
      const getQueryDate = query.get("date");

      if (getQueryDate) {
        setCurrentDate(getQueryDate);
      } else {
        setCurrentDate(today());
      }
    };

    getDate();
  }, [query, route]);

  const handleFinishTable = async (event, tableId) => {
    event.preventDefault();
    setTablesError(null);

    const confirmation = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (confirmation) {
      try {
        await finishTable(tableId);
        await loadDashboard();
      } catch (error) {
        setTablesError(error);
      }
    }
  };

  const handlePreviousDay = () => {
    const previousDate = previous(currentDate);
    history.push(`/dashboard?date=${previousDate}`);
    setCurrentDate(previousDate);
  };

  const handleToday = () => {
    const todayDate = today();
    history.push(`/dashboard?date=${todayDate}`);
    setCurrentDate(todayDate);
  };

  const handleNextDay = () => {
    const nextDate = next(currentDate);
    history.push(`/dashboard?date=${nextDate}`);
    setCurrentDate(nextDate);
  };

  const handleCancelReservation = async (reservationId) => {
    const confirmation = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );

    if (confirmation) {
      try {
        await cancelReservation(reservationId);
        await loadDashboard();
      } catch (error) {
        // Handle error
      }
    }
  };

  return (
    <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-center align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h1">Dashboard</h1>
      </div>
      <div className="row d-md-flex mb-3">
        <div className="col-md-12 text-center mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handlePreviousDay}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary mx-2"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleNextDay}
          >
            Next
          </button>
        </div>
        <div className="col-md-12 text-center">
          <h4 className="mb-10 text-nowrap">Reservations for {currentDate}</h4>
          <ErrorAlert error={reservationsError} />
          {reservations ? (
            <ReservationsList
              reservations={reservations}
              date={currentDate}
              cancelHandler={handleCancelReservation}
            />
          ) : null}
        </div>
      </div>
      <div className="row d-md-flex mb-3">
        <div className="col-md-12 text-center">
          <TablesList
            tables={tables}
            error={tablesError}
            clickHandler={handleFinishTable}
          >
            {(table) => (
              <TableFinish
                key={table.table_id}
                table={table}
                clickHandler={handleFinishTable}
                error={tablesError}
              />
            )}
          </TablesList>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;