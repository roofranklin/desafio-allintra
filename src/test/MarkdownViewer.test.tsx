import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditableMarkdownViewer } from "../components/MarkdownViewer";

global.fetch = vi.fn();
const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

describe("EditableMarkdownViewer", () => {
  const mockFilename = "exemplo.md";

  beforeEach(() => {
    localStorage.clear();
    mockFetch.mockReset();
  });

  it("mostra o estado de carregando", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("# Título Exemplo"),
    });

    render(<EditableMarkdownViewer filename={mockFilename} />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("✅ Sincronizado com o repositório")).toBeInTheDocument();
    });
  });

  it("permite alternar entre visualizar e editar", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("Texto de teste"),
    });
  
    render(<EditableMarkdownViewer filename={mockFilename} />);
  
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /editar/i })).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByRole("button", { name: /editar/i }));
  
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  
    fireEvent.click(screen.getByRole("button", { name: /visualizar/i }));
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
  

  it("salva conteúdo editado no localStorage", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("Texto original"),
    });

    render(<EditableMarkdownViewer filename={mockFilename} />);

    await waitFor(() => {
      expect(screen.getByText("Editar")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Editar"));
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Texto alterado" } });

    fireEvent.click(screen.getByText("Salvar (somente local)"));

    const saved = localStorage.getItem(`md_${mockFilename}`);
    expect(saved).toBe("Texto alterado");
  });
});
