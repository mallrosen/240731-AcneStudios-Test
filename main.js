import "./src/css/style.css"
import { acneStudiosList } from "./src/lists/acneStudiosList";
import { Category } from './src/models/Category.js';
import { CategoryCollection } from './src/models/CategoryCollection.js';

function createCategoryCollection() {
    const categories = acneStudiosList.categories.map(category => {
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
  li.innerHTML = categoryCollection.categories[i].id;


//KANSKE GÅR ATT GÖRA PÅ ETT LÄTTARE SÄTT???

  if (categoryCollection.categories[i].online === false) {
    li.className = 'offline'; 
  } else {
    li.className = 'online'
  }

  ul.appendChild(li);
}

const onlineButton = document.getElementById("onlineButton");
onlineButton.innerHTML = 'ONLY SHOW OFFLINE'

onlineButton.addEventListener("click", () => {
  const onlineItems = document.querySelectorAll(".online");
  const offlineItems = document.querySelectorAll(".offline");

  onlineItems.forEach(item => {
    if (item.style.display === "none") {
      item.style.display = "block";
      onlineButton.innerHTML = 'ONLY SHOW OFFLINE'
    } else {
      item.style.display = "none";
    }
  });

  offlineItems.forEach(item => {
    if (item.style.display === "block") {
      item.style.display = "none";
    } else {
      item.style.display = "block";
            onlineButton.innerHTML = 'ONLY SHOW ONLINE'
    }
  });
});

document.body.appendChild(onlineButton);


