import React from "react";
import App from "./App";

import {
    render,
    screen,
    waitFor,
    fireEvent,
    act,
} from "@testing-library/react";

test("Test display panel", async () => {
    jest.useFakeTimers();
    //just general render test
    render(<App />);

    const titleElement = screen.getByText("STORD URL Shortener");
    expect(titleElement).toBeInTheDocument();
});

test("Test display panel", async () => {
    Object.defineProperty(window, "location", {
        value: {
            pathname: "/not-found/xxx",
        },
    });
    render(<App />);

    const titleElement = screen.getByText("Not found");
    expect(titleElement).toBeInTheDocument();
});
