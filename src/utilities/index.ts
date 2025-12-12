export function copyObject(a: any) {
  return JSON.parse(JSON.stringify(a));
}

export const download = (data: any, filename: string) => {
  const file = JSON.stringify(data);
  const link = document.createElement('a');

  link.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(file)
  );
  link.setAttribute('download', filename || 'data.json');
  link.style.display = 'none';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
