import React from "react";

const TableForm = ({ submitHandler, cancelHandler, changeHandler, formData }) => {
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <h3>Create Table</h3>
          <form onSubmit={submitHandler} className="card">
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="table_name"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Table name:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="table_name"
                  id="table_name"
                  type="text"
                  required={true}
                  minLength={2}
                  value={formData.table_name}
                  onChange={changeHandler}
                  placeholder="Enter table name (at least 2 characters)"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="capacity"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Capacity:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="capacity"
                  id="capacity"
                  type="number"
                  required={true}
                  min={1}
                  value={formData.capacity}
                  onChange={changeHandler}
                  placeholder="Enter capacity (minimum: 1 person)"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <div className="col-sm-8 offset-sm-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "blue", color: "white" }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={cancelHandler}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TableForm;