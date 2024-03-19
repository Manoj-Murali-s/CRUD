   // Function to get data from local storage
   function getData() {
    const storedData = localStorage.getItem('items');
    return storedData ? JSON.parse(storedData) : [];
  }

  // Function to set data in local storage
  function setData(data) {
    localStorage.setItem('items', JSON.stringify(data));
  }

  function displayItems(items) {
    const itemList = document.getElementById('items-list');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn'); // Add edit-btn class
        editBtn.addEventListener('click', () => editItem(index));
        listItem.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn'); // Add delete-btn class
        deleteBtn.addEventListener('click', () => deleteItem(index));
        listItem.appendChild(deleteBtn);

        itemList.appendChild(listItem);
    });
}

  // Function to create a new item
  function createItem(itemName) {
    const items = getData();
    items.push(itemName);
    setData(items);
    displayItems(items);
    document.getElementById('item-form').reset();
  }

  // Function to delete an item
  function deleteItem(index) {
    const items = getData();
    items.splice(index, 1);
    setData(items);
    displayItems(items);
  }

  // Function to edit an item
  function editItem(index) {
    const items = getData();
    const newName = prompt('Enter new name:');
    if (newName) {
      items[index] = newName;
      setData(items);
      displayItems(items);
    }
  }

  // Event listener for form submission
  document.getElementById('item-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = document.getElementById('item-name').value;
    if (itemName.trim() !== '') {
      createItem(itemName);
    }
  });

  // Display initial items from local storage
  displayItems(getData());