export type LocalEdit = {
    filename: string;
    content: string;
    updatedAt: string;
  };
  
  const storageKey = "md_edits";
  
  export const saveEdit = (filename: string, content: string) => {
    const edits = getAllEdits();
    const updated = {
      filename,
      content,
      updatedAt: new Date().toISOString(),
    };
  
    const newEdits = {
      ...edits,
      [filename]: updated,
    };
  
    localStorage.setItem(storageKey, JSON.stringify(newEdits));
  };
  
  export const getAllEdits = (): Record<string, LocalEdit> => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  };
  
  export const getEdit = (filename: string): LocalEdit | null => {
    return getAllEdits()[filename] || null;
  };
  
  export const clearEdit = (filename: string) => {
    const edits = getAllEdits();
    delete edits[filename];
    localStorage.setItem(storageKey, JSON.stringify(edits));
  };
  