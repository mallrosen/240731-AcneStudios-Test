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
  button.innerHTML = rootCategory.id;
  
  button.addEventListener('click', () => {
    displayCategoryList(rootCategory.categories);
    showAllItems()
  });
  buttonContainer.appendChild(button);
});

function traverseTree(tree, callback) {
  tree.forEach(node => {
    callback(node);
    if (node.categories && node.categories.length > 0) {
      traverseTree(node.categories, callback);
    }
  });
}

function displayCategoryList(categories) {
  const ul = document.getElementById("theList");
  ul.innerHTML = '';
  traverseTree(categories, (node) => {
    const li = document.createElement("li");
    li.innerHTML = node.id; 
    li.classList.add('item')
    if (node.online) {
      li.classList.add('online');
    } else {
      li.classList.add('offline');
    }
    ul.appendChild(li); 
  });
  sortItems()
  updateItemVisibility()
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


let showOnline = true;
let showOffline = true;


function showOnlineItems() {
  showOnline = true;
  showOffline = false;
  updateItemVisibility();
}


function showOfflineItems() {
  showOnline = false;
  showOffline = true;
  updateItemVisibility();
}


function showAllItems() {
  showOnline = true;
  showOffline = true;
  updateItemVisibility();
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

//STARTSIDAN
displayCategoryList(acneStudiosList)


