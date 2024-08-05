import "./src/css/style.css";
import { acneStudiosList } from "./src/lists/acneStudiosList";
import { Category } from "./src/models/Category.js";
import { CategoryCollection } from "./src/models/CategoryCollection.js";

function createCategoryCollection() {
  const categories = acneStudiosList.categories.map((category) => {
    return new Category(
      category.id,
      category.creation_date,
      category.parent_category_id,
      category.last_modified,
      category.name,
      category.position,
      category.online
    );
  });

  return new CategoryCollection(acneStudiosList.total, categories);
}

const categoryCollection = createCategoryCollection();
console.log(categoryCollection);

const ul = document.getElementById("theList");

for (let i = 0; i < categoryCollection.categories.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = categoryCollection.categories[i].parentCategoryId;

  if (categoryCollection.categories[i].online === false) {
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

