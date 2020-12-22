import React from "react";
import { UrlItem } from "./UrlItem";

import {
    render,
    screen,
    waitFor,
    fireEvent,
    act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
Object.assign(navigator, {
    clipboard: {
        writeText: async () => {
            return Promise.resolve();
        },
    },
});

test("renders learn react link", async () => {
    jest.useFakeTimers();
    //just general render test
    const { container } = render(
        <UrlItem item={{ slug: "xxx", url: "http://ms.com" }} />
    );

    expect(screen.getByText("http://ms.com")).toBeInTheDocument();
    expect(screen.getByTestId("link").textContent).toMatch(/http.+?\/xxx/);

    jest.spyOn(navigator.clipboard, "writeText");

    const copyButton = screen.getByText("copy");
    await userEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "http://localhost/xxx"
    );

    await waitFor(() => {
        const copyButton = screen.getByText("U got it:)");
        expect(copyButton).toBeInTheDocument();
    });

    act(() => {
        jest.runAllTimers();
    });

    const copyButton1 = screen.getByText("copy");
    expect(copyButton1).toBeInTheDocument();

    //testing clear timeout if one is going one
    copyButton.click();
    act(() => {
        jest.advanceTimersByTime(2000);
    });
    await waitFor(() => {
        const copyButton = screen.getByText("copy");
        expect(copyButton).toBeInTheDocument();
    });

    //expect(setTimeout).toHaveBeenCalledTimes(1);
});
