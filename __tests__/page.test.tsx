import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../app/page";

describe("Home Page - GitHub Actions Lab Dashboard", () => {
  it("renders the main title and description", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Next\.js GitHub Actions/i);

    const description = screen.getByText(/Explore automated linting, unit testing with Vitest/i);
    expect(description).toBeInTheDocument();
  });

  it("renders all four CI pipeline stages by default", () => {
    render(<Home />);

    expect(screen.getByText("Linting & Code Quality")).toBeInTheDocument();
    expect(screen.getByText("Automated Unit & Component Tests")).toBeInTheDocument();
    expect(screen.getByText("TypeScript & Turbopack Build")).toBeInTheDocument();
    expect(screen.getByText("Dependency Security Audit")).toBeInTheDocument();
  });

  it("switches to the Lab Checklist tab when clicked", () => {
    render(<Home />);

    const checklistTab = screen.getByRole("button", { name: /Lab Checklist/i });
    fireEvent.click(checklistTab);

    expect(screen.getByText("GitHub Actions Mastery Progress")).toBeInTheDocument();
    expect(screen.getByText("Continuous Integration Workflow (ci.yml)")).toBeInTheDocument();
  });

  it("switches to the Workflow Commands tab when clicked", () => {
    render(<Home />);

    const commandsTab = screen.getByRole("button", { name: /Workflow Commands/i });
    fireEvent.click(commandsTab);

    expect(screen.getByText("Static Linting")).toBeInTheDocument();
    expect(screen.getByText("npm test")).toBeInTheDocument();
    expect(screen.getByText("npm run build")).toBeInTheDocument();
  });

  it("allows toggling a checklist item", () => {
    render(<Home />);

    // Switch to checklist tab
    const checklistTab = screen.getByRole("button", { name: /Lab Checklist/i });
    fireEvent.click(checklistTab);

    const checkbox = screen.getByRole("checkbox", {
      name: /Automated Deployment \/ Release Pipeline/i,
    });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("clicking simulate pipeline button runs the simulation", () => {
    render(<Home />);

    const simulateBtn = screen.getByRole("button", { name: /Simulate CI Pipeline/i });
    expect(simulateBtn).toBeInTheDocument();

    fireEvent.click(simulateBtn);
    expect(screen.getByText(/Running Pipeline Simulation/i)).toBeInTheDocument();
  });
});
