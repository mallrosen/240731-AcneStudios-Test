export function setupButtons(categoryTree, displayCategoryList, showOnlineItems, showOfflineItems, showAllItems, updateItemVisibility) {
  
  const onlineButton = document.getElementById("onlineButton");
  const offlineButton = document.getElementById("offlineButton");
  const showAllButton = document.getElementById("showAllButton");

  onlineButton.innerHTML = "SHOW ONLINE PRODUCTS";
  offlineButton.innerHTML = "SHOW OFFLINE PRODUCTS";
  showAllButton.innerHTML = "SHOW ALL PRODUCTS";

  onlineButton.addEventListener("click", showOnlineItems);
  offlineButton.addEventListener("click", showOfflineItems);
  showAllButton.addEventListener("click", showAllItems);

  const buttonContainer = document.getElementById("buttonContainer");

  categoryTree.forEach((rootCategory) => {
    const button = document.createElement("button");
    button.innerHTML = rootCategory.name.default;

    if (rootCategory.online === false) {
      button.classList.add('hidden');
    }

    button.addEventListener("click", function () {
      document.querySelectorAll("#buttonContainer button").forEach((btn) => {
        btn.classList.remove("hover-active");
      });
      this.classList.toggle("hover-active");
      displayCategoryList(rootCategory.categories);

    });
    buttonContainer.appendChild(button);
  });
  return buttonContainer
}