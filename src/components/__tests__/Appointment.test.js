import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import Confirm from "components/Appointment/Confirm";

afterEach(cleanup);



describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
  it("renders without crashing", () => {
    render(<Confirm />);
  });
});