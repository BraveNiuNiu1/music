export default function (url, method = 'GET', data) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, '/api' + url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
    data = data ? JSON.stringify(data) : null;
    xhr.send(data);
  });
}
