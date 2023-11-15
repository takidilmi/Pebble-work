import React from "react";
import { render } from "@testing-library/react";
import WideScreenCard from "../WideScreenCard";

describe("WideScreenCard", () => {
    it("renders correctly", () => {
        const event = {
            eventId: "1",
            title: "Test Event",
            type: "Test Type",
            image: "test-image.jpg",
            location: "Test Location",
            date: "2023-01-01",
            time: "12:00",
            description: "Test Description",
        };

        const { asFragment } = render(<WideScreenCard {...event} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
