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

const ul = document.getElementById('theList')

for (let i = 0; i < acneStudiosList.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = acneStudiosList[i].id;

  if (acneStudiosList[i].online === false) {
    li.className = "offline";
  } else {
    li.className = "online";
  }

  ul.appendChild(li);
}

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


function updateItemVisibility() {
  const allItems = document.querySelectorAll('.item'); 
  allItems.forEach((item) => {
    if (item.classList.contains('online')) {
      item.style.display = showOnline ? "block" : "none";
    } else if (item.classList.contains('offline')) {
      item.style.display = showOffline ? "block" : "none";
    }
  });
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
}




// const onlineItems = document.querySelectorAll(".online");
// const offlineItems = document.querySelectorAll(".offline");

// function showOnlineItems() {
//   onlineItems.forEach((item) => {
//     item.style.display = "block";
//   });
//   offlineItems.forEach((item) => {
//     item.style.display = "none";
//   });
// }

// function showOfflineItems() {
//   onlineItems.forEach((item) => {
//     item.style.display = "none";
//   });
//   offlineItems.forEach((item) => {
//     item.style.display = "block";
//   });
// }

// function showAllItems() {
//   onlineItems.forEach((item) => {
//     item.style.display = "block";
//   });
//   offlineItems.forEach((item) => {
//     item.style.display = "block";
//   });

// }



