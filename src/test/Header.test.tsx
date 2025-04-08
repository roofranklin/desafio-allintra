import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header", () => {
  it("renderiza o logo e o botão corretamente", () => {
    render(
      <BrowserRouter>
        <Header
          buttonText="Área administrativa"
          buttonLink="/admin"
          srcLogo="/logo.png"
        />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Área administrativa")).toBeInTheDocument();
  });
});