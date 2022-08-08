import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByPlaceholderText,
  getByText,
  getAllByTestId,
  getByAltText,
  queryByText,
} from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  let container;
  let day;
  let appointments;
  beforeEach(async () => {
    container = render(<Application />).container;
    await waitForElement(() => getByText(container, "Archie Cohen"));
    appointments = getAllByTestId(container, "appointment");
    day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    fireEvent.click(getByText(container, "Tuesday"));
    expect(getByText(container, /Leopold Silvers/i)).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    expect(
      getByPlaceholderText(appointment, /enter Student Name/i)
    ).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /enter Student Name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(
        appointment,
        /are you sure you would like to delete this interview/i
      )
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /enter Student Name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText(appointment, /enter Student Name/i), {
      target: {
        value: "Lydia Miller-Jones",
      },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, "Could not save appointment.")
    );
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument;
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const appointment = appointments.find((app) =>
      queryByText(app, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    await waitForElement(() =>
      getByText(appointment, "Could not delete appointment.")
    );
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument;
  });
});
