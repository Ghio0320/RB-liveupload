const API_URL = 'https://script.google.com/macros/s/AKfycbxhErlo6WxkCYvjWAe54zMTDnyTlw5cF5KVwe4jJby16tRnGZjM0CZGoqZh-9vvg6EZlA/exec';

const form = document.getElementById('uploadForm');
const itemsDiv = document.getElementById('items');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = document.getElementById('image').files[0];

  const reader = new FileReader();

  reader.onload = async () => {
    const base64 = reader.result.split(',')[1];

    const data = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      location: document.getElementById('location').value,
      price: document.getElementById('price').value,
      imageBase64: base64,
      mimeType: file.type,
      fileName: file.name
    };

    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    alert('Uploaded Successfully');

    form.reset();

    loadItems();
  };

  reader.readAsDataURL(file);
});

async function loadItems() {
  const response = await fetch(API_URL);
  const data = await response.json();

  itemsDiv.innerHTML = '';

  data.reverse().forEach(item => {
    itemsDiv.innerHTML += `
      <div class="card">
        <img src="${item.ImageURL}">
        <h3>${item.Title}</h3>
        <p>${item.Description}</p>
        <p><b>Location:</b> ${item.Location}</p>
        <p><b>Price:</b> ₱${item.Price}</p>
      </div>
    `;
  });
}

loadItems();
