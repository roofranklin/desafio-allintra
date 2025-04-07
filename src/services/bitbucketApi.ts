export async function fetchMarkdownFile(filename: string): Promise<string> {
    const url = `https://bitbucket.org/allintra/teste-front-end/raw/main/docs/${filename}`;
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Erro ao buscar o arquivo: ${filename}`);
    }
  
    return await res.text();
}
  
  