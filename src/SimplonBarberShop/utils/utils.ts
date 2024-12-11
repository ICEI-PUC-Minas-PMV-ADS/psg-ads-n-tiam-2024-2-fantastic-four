export function formatDateToDDMMYYYY(input: any) {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error(
      "Formato de data inválido. Use um formato compatível com Date."
    );
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


export function formatDate(date: any): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}