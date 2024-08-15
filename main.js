import "./src/css/style.css";
import { acneStudiosList } from "./src/lists/acneStudiosList";

function buildCategoryTree(categories, parentId = 'root') {
  return categories
    .filter(category => category.parent_category_id === parentId)
    .map(category => ({
      ...category,
      categories: buildCategoryTree(categories, category.id)
    }));
}

const categoryTree = buildCategoryTree(acneStudiosList);
console.log(categoryTree);


const onlineButton = document.getElementById('onlineButton');
const offlineButton = document.getElementById('offlineButton');
const showAllButton = document.getElementById('showAllButton');


onlineButton.innerHTML = "SHOW ONLINE PRODUCTS";
offlineButton.innerHTML = "SHOW OFFLINE PRODUCTS";
showAllButton.innerHTML = "SHOW ALL PRODUCTS"

onlineButton.addEventListener('click', showOnlineItems);
offlineButton.addEventListener('click', showOfflineItems);
showAllButton.addEventListener('click', showAllItems);


const buttonContainer = document.getElementById("buttonContainer");


categoryTree.forEach(rootCategory => {
  const button = document.createElement('button');
  button.innerHTML = rootCategory.name.default;

  if (rootCategory.name.default === 'Hidden') {
    button.classList = 'hidden';
  }


  button.addEventListener('click', function() {

    document.querySelectorAll('#buttonContainer button').forEach(btn => {
      btn.classList.remove('hover-active');
    });
    this.classList.toggle('hover-active');
    displayCategoryList(rootCategory.categories);
    showOnline = true;
    showOffline = false;
    updateItemVisibility();

  });
  buttonContainer.appendChild(button);
} 
);

function displayCategoryList(categories) {

  const ul = document.getElementById("theList");
  ul.innerHTML = '';


  categories.forEach(category => {
    const itemDisplay = document.getElementById('item-display')
    itemDisplay.innerHTML = '';
    const li = document.createElement('li');

    li.textContent = category.name.default;
    li.classList.add('item')
    if (category.online) {
      li.classList.add('online');
    } else {
      li.classList.add('offline');
    }

    li.addEventListener('click', () => {
      if (category.categories && category.categories.length === 0) {
        displayCategoryName(category.name.default);
      } else {
        displayCategoryList(category.categories);
      }
    });

    ul.appendChild(li);
  });

  sortItems();
}

function displayCategoryName(name) {
  const displayDiv = document.getElementById('item-display');
  const acneStudiosList = document.getElementById('theList')
  displayDiv.innerHTML = ''; 
  acneStudiosList.innerHTML = '';

  const nameElement = document.createElement('div');
  nameElement.textContent = name;
  displayDiv.appendChild(nameElement);
}


function sortItems() {
  const ul = document.getElementById("theList");
  const itemsArray = [...ul.querySelectorAll('li')];

  itemsArray.sort((a, b) => {
    const textA = a.textContent.toUpperCase();
    const textB = b.textContent.toUpperCase();
    if (textA < textB) {
      return -1;
    } else if (textA > textB) {
      return 1;
    } else {
      return 0;
    }
  });
  ul.innerHTML = '';
  itemsArray.forEach(item => ul.appendChild(item));
}


const hiddenButton = Array.from(buttonContainer.children).find(button => button.classList.contains('hidden'))

let showOffline = true
let showOnline = true

function showOnlineItems() {
  showOnline = true;
  showOffline = false;
  updateItemVisibility();
  if(hiddenButton){
    hiddenButton.classList = 'hidden'
  }

}


function showOfflineItems() {
  showOnline = false;
  showOffline = true;
  updateItemVisibility();
  if(hiddenButton){
    hiddenButton.classList.replace('hidden', 'offline')
  }

}


function showAllItems() {
  showOnline = true;
  showOffline = true;
  updateItemVisibility();
  if(hiddenButton){
    hiddenButton.classList.replace('hidden', 'offline')
  }
}

function updateItemVisibility() {
  const allItems = document.querySelectorAll('.item'); 
  allItems.forEach((item) => {
    if (item.classList.contains('online')) {
      item.style.display = showOnline ? "block" : "none";
    } else if (item.classList.contains('offline')) {
      item.style.display = showOffline ? "block" : "none";
    }
  });
  sortItems()
}

