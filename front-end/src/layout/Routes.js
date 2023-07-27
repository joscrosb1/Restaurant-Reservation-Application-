import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import NewReservationForm from "../reservations/NewReservationForm";
import ReservationSeating from "../reservations/ReservationSeating";
import SearchReservations from "../reservations/SearchReservations";
import EditCurrentReservation from "../reservations/EditCurrentReservation";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewTable from "../tables/NewTable";
import { today } from "../utils/date-time";

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/reservations/new">
        <NewReservationForm />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditCurrentReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <ReservationSeating />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <SearchReservations />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;