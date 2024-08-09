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

// function traverseTree(tree, callback) {
//   tree.forEach(node => {
//     callback(node);
//     if (node.categories && node.categories.length > 0) {
//       traverseTree(node.categories, callback);
//     }
//   });
// }

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





//för varje sak i min lista ska jag göra en addeventlistener som gör att om man klickar på den så kommer man
categoryTree.forEach(rootCategory => {
  const button = document.createElement('button');
  button.innerHTML = rootCategory.name.default;
  
  button.addEventListener('click', function() {

    document.querySelectorAll('#buttonContainer button').forEach(btn => {
      btn.classList.remove('hover-active');
    });
    this.classList.toggle('hover-active');
    displayCategoryList(rootCategory.categories);

    
  });
  buttonContainer.appendChild(button);
});

//INGEN KLICK OM MAN INTE KAN
//if (categories && categories.length > 0)

function displayCategoryList(categories) {

  const ul = document.getElementById("theList");
  ul.innerHTML = '';


  categories.forEach(category => {
    const li = document.createElement('li');

    li.textContent = category.name.default;
    li.classList.add('item')
    if (category.online) {
      li.classList.add('online');
    } else {
      li.classList.add('offline');
    }

    li.addEventListener('click', () => {
      displayCategoryList(category.categories);
    });

    ul.appendChild(li);
  });

  sortItems()

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

