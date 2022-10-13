import Contact from "./Contact";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("Tests for the Contact component", () => {
  test("returns four input boxes", async () => {
    const { getByLabelText } = render(<Contact />);

    expect(getByLabelText(/name/i) as HTMLInputElement).toBeInTheDocument();
    expect(getByLabelText(/email/i) as HTMLInputElement).toBeInTheDocument();
    expect(getByLabelText(/subject/i) as HTMLInputElement).toBeInTheDocument();
    expect(getByLabelText(/message/i) as HTMLInputElement).toBeInTheDocument();
  });

  test("Submitting the form and receiving a confirmation text", () => {
    const { getByText } = render(<Contact />);
    expect(getByText("Nothing sent yet")).toBeInTheDocument();
    fireEvent.submit(getByText("Send"));
    getByText("Nothing sent yet").innerText =
      "Your email has been sent and you will receive a confirmation email shortly. Thank you.";
    waitFor(() =>
      expect(
        getByText(
          "Your email has been sent and you will receive a confirmation email shortly. Thank you."
        )
      ).toBeInTheDocument()
    );
  });
});
