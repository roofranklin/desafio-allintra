import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Sidebar } from "../components/Sidebar";
import * as api from "../utils/bitbucketApi";
import { MemoryRouter, useLocation } from "react-router-dom";

// Mock do hook useLocation
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

// Mock da API do Bitbucket
vi.mock("../utils/bitbucketApi", () => ({
  fetchMarkdownFile: vi.fn(),
}));

describe("Sidebar", () => {
  const mockSidebarContent = `
* [Página Inicial](/home.md)
* [Sobre Nós](/sobre.md)
`;

  beforeEach(() => {
    vi.clearAllMocks();
    (api.fetchMarkdownFile as any).mockResolvedValue(mockSidebarContent);
    (useLocation as any).mockReturnValue({ pathname: "/home.md" });
  });

  it("renderiza os itens do sidebar e responde ao clique", async () => {
    const handleSelect = vi.fn();
  
    render(
      <MemoryRouter>
        <Sidebar onSelect={handleSelect} />
      </MemoryRouter>
    );
  
    // Aguarda os itens carregarem
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Página Inicial" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Sobre Nós" })).toBeInTheDocument();
    });
  
    // Clica no botão 'Sobre Nós'
    const botaoSobre = screen.getByRole("button", { name: "Sobre Nós" });
    fireEvent.click(botaoSobre);
  
    expect(handleSelect).toHaveBeenCalledWith("/sobre.md");
  });
  
});
