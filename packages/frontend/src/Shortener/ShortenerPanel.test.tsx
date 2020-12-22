import React from "react";
import {
    render,
    screen,
    waitFor,
    fireEvent,
    act,
} from "@testing-library/react";
import { ShortenerPanel } from "./ShortenerPanel";
import { rest } from "msw";
import { setupServer } from "msw/node";

/**
 * Mock for api request
 */
const server = setupServer(
    rest.post("http://localhost:8080", (req, res, ctx) => {
        let response: any = {
            errorCode: 100,
            message: "Provided URL is not valid",
        };

        if (req.body.url == "http://ms.com") {
            response = { slug: "xxx" };
        }

        if (req.body.url == "http://error.com") {
            ctx.status(500);
            return res(ctx.text("Error"));
        }

        return res(ctx.json(response));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Render test", async () => {
    //just general render test
    render(<ShortenerPanel />);
    const titleElement = screen.getByText("STORD URL Shortener");
    expect(titleElement).toBeInTheDocument();
});

test("Error comm is displaying", async () => {
    render(<ShortenerPanel />);
    const button = screen.getByText("Make it short");
    fireEvent.click(button);

    await waitFor(() => {
        const errorText = screen.getByText("Provided URL is not valid");
        expect(errorText).toBeVisible();
    });
});

test("Proper address provided and result is displayed", async () => {
    render(<ShortenerPanel />);
    const button = screen.getByText("Make it short");

    //test proper address process
    const textarea = screen.getByPlaceholderText("Paster your url here");
    expect(textarea).toBeInTheDocument();
    fireEvent.change(await textarea, { target: { value: "http://ms.com" } });

    fireEvent.click(button);

    await waitFor(() => {
        return expect(screen.getByText("Loading ...")).not.toHaveClass(
            "ShortenerPanel-loading-on"
        );
    });

    //expect to have one result on liet
    await waitFor(() => {
        expect(screen.getByTestId("list-container").childNodes.length).toBe(1);
    });
});

test("Loading indicator test", async () => {
    render(<ShortenerPanel />);
    const button = screen.getByText("Make it short");
    fireEvent.click(button);
    // testing if loading is turning on
    await waitFor(() => {
        expect(screen.getByText("Loading ...")).toHaveClass(
            "ShortenerPanel-loading-on"
        );
    });

    await waitFor(() => {
        expect(screen.getByText("Loading ...")).not.toHaveClass(
            "ShortenerPanel-loading-on"
        );
    });
});

test("Check hit many times the same button", async () => {
    render(<ShortenerPanel />);

    //test proper address process
    const textarea = screen.getByPlaceholderText("Paster your url here");
    expect(textarea).toBeVisible();

    fireEvent.change(textarea, { target: { value: "http://ms.com" } });

    const button = screen.getByText("Make it short");
    await fireEvent.click(button);

    await waitFor(() => {
        expect(screen.getByText("Loading ...")).not.toHaveClass(
            "ShortenerPanel-loading-on"
        );
    });

    await fireEvent.click(button);

    // //expect to have one result on liet
    await waitFor(() => {
        expect(screen.getByText("Loading ...")).not.toHaveClass(
            "ShortenerPanel-loading-on"
        );
        expect(screen.getByTestId("list-container").childNodes.length).toBe(1);
    });
});

test("Testing API connection problem", async () => {
    render(<ShortenerPanel />);
    const button = screen.getByText("Make it short");
    const textarea = screen.getByPlaceholderText("Paster your url here");
    fireEvent.change(await textarea, { target: { value: "http://error.com" } });
    fireEvent.click(button);
    // testing if loading is turning on
    await waitFor(() => {
        expect(
            screen.getByText("Error with connection to service")
        ).toBeInTheDocument();
    });
});
