import React from "react";
import { render, screen } from "@testing-library/react";
import { ShortenerPanel } from "./ShortenerPanel";

test("renders learn react link", () => {
    const { container } = render(<ShortenerPanel />);
    const linkElement = screen.getByText(/Stord/i);
    expect(linkElement).toBeInTheDocument();

    const textArea = container.querySelector("textarea");
    expect(textArea).toBeInTheDocument();
});
