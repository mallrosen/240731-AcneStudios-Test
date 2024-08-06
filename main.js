import "./src/css/style.css";
import { acneStudiosList } from "./src/lists/acneStudiosList";

//FIXA SÅ ATT OFFLINE/ONLINE FUNKAR ÄVEN INNE PÅ KATEGORIER

function buildCategoryTree(categories, parentId = 'root') {
  return categories
    .filter(category => category.parent_category_id === parentId)
    .map(category => ({
      ...category,
      categories: buildCategoryTree(categories, category.id)
    }));
}

const categories = acneStudiosList

const categoryTree = buildCategoryTree(categories);
console.log(categoryTree);


function traverseTree(tree, callback) {
  tree.forEach(node => {
    callback(node);
    if (node.categories && node.categories.length > 0) {
      traverseTree(node.categories, callback);
    }
  });
}

// knappar för kategorierna
const buttonContainer = document.getElementById("buttonContainer");

categoryTree.forEach(rootCategory => {
  const button = document.createElement('button');
  button.innerHTML = rootCategory.id;
  
  button.addEventListener('click', () => {
    displayCategoryList(rootCategory.categories);
  });
  buttonContainer.appendChild(button);
});


// Funktion för att visa en lista med kategorier
function displayCategoryList(categories) {
  const ul = document.getElementById("theList");
  ul.innerHTML = '';
  traverseTree(categories, (node) => {
    const li = document.createElement("li");
    li.innerHTML = node.id; 
    ul.appendChild(li);
  });
}


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
const onlineItems = document.querySelectorAll(".online");
const offlineItems = document.querySelectorAll(".offline");

onlineButton.innerHTML = "SHOW ONLINE PRODUCTS";
offlineButton.innerHTML = "SHOW OFFLINE PRODUCTS";
showAllButton.innerHTML = "SHOW ALL PRODUCTS"


function showOnlineItems() {
  onlineItems.forEach((item) => {
    item.style.display = "block";
  });
  offlineItems.forEach((item) => {
    item.style.display = "none";
  });
}

function showOfflineItems() {
  onlineItems.forEach((item) => {
    item.style.display = "none";
  });
  offlineItems.forEach((item) => {
    item.style.display = "block";
  });
}

function showAllItems() {
  onlineItems.forEach((item) => {
    item.style.display = "block";
  });
  offlineItems.forEach((item) => {
    item.style.display = "block";
  });

}

onlineButton.addEventListener('click', showOnlineItems);
offlineButton.addEventListener('click', showOfflineItems);
showAllButton.addEventListener('click', showAllItems);
