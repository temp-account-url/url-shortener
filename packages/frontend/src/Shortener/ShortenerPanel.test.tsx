import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ShortenerPanel } from "./ShortenerPanel";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

const server = setupServer(
    rest.post("http://localhost:8080", (req, res, ctx) => {
        let response: any = {
            errorCode: 100,
            message: "Provided URL is not valid",
        };

        if (req.body.url == "http://ms.com") {
            response = { slug: "xxx" };
        }

        return res(ctx.json(response));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders learn react link", async () => {
    render(<ShortenerPanel />);
    const titleElement = screen.getByText("STORD URL Shortener");
    expect(titleElement).toBeInTheDocument();

    const button = screen.getByText("Make it short");
    //console.log(button);

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    // testing if loading is turning on
    expect(screen.getByText("Loading ...")).toHaveClass(
        "ShortenerPanel-loading-on"
    );

    // testing error is visible when provided
    let errorText;
    await waitFor(() => {
        errorText = screen.getByText("Provided URL is not valid");
        expect(errorText).toBeVisible();
    });

    //test proper address process
    const textarea = screen.getByPlaceholderText("Paster your url here");
    expect(textarea).toBeInTheDocument();
    fireEvent.change(await textarea, { target: { value: "http://ms.com" } });
    userEvent.click(button);

    await waitFor(() => {
        expect(errorText).toBeEmptyDOMElement();
        expect(screen.getByTestId("list-container").childNodes.length).toBe(1);
    });

    //again the same address
    userEvent.click(button);
    await waitFor(() => {
        expect(screen.getByText("Loading ...")).not.toHaveClass(
            "ShortenerPanel-loading-on"
        );
        expect(screen.getByTestId("list-container").childNodes.length).toBe(1);
        console.log("tutaj");
    });
});
