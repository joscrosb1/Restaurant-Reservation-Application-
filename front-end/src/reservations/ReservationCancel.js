const ReservationCancel = ({ reservation_id, cancelHandler }) => {
	const clickHandler = (event) => {
	  event.preventDefault();
  
	  cancelHandler(reservation_id);
	};
  
	return (
	  <div>
		<button
		  className="btn btn-secondary"
		  data-reservation-id-cancel={reservation_id}
		  onClick={clickHandler}
		>
		  Cancel
		</button>
	  </div>
	);
  };
  

export default ReservationCancel;
