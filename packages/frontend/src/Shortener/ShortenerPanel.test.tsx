import React from "react";
import { render, screen } from "@testing-library/react";
import { ShortenerPanel } from "./ShortenerPanel";
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.post('/', (req, res, ctx) => {
        return res(ctx.json({ greeting: 'hello there' }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders learn react link", () => {
    const { container } = render(<ShortenerPanel />);
    const linkElement = screen.getByText(/Stord/i);
    expect(linkElement).toBeInTheDocument();


    const textArea = container.querySelector("textarea");
    expect(textArea).toBeInTheDocument();
});
