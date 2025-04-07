
export async function fetchMarkdownFile(fileName: string): Promise<string> {
    const response = await fetch(`https://bitbucket.org/allintra/teste-front-end/raw/main/docs/${fileName}`);
    if (!response.ok) throw new Error("Erro ao buscar o arquivo");
    return await response.text();
}
  