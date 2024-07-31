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
  ul.appendChild(li);
}