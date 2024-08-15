import { sortItems } from "../../main";

let showOffline = true;
let showOnline = true;
let hiddenButtons;

export function itemVisibility(buttonContainer) {
  hiddenButtons = Array.from(buttonContainer.children).filter(button =>
    button.classList.contains('hidden')
  );
}

export function showOnlineItems() {
  showOnline = true;
  showOffline = false;
  updateItemVisibility();
  if (hiddenButtons.length > 0) {
    hiddenButtons.forEach(button => button.classList.add('hidden'));
  }
}

export function showOfflineItems() {
  showOnline = false;
  showOffline = true;
  updateItemVisibility();
  if (hiddenButtons.length > 0) {
    hiddenButtons.forEach(button => button.classList.replace('hidden', 'offline'));
  }
}

export function showAllItems() {
  showOnline = true;
  showOffline = true;
  updateItemVisibility();
  if (hiddenButtons.length > 0) {
    hiddenButtons.forEach(button => button.classList.replace("hidden", "offline"));
  }
}

export function updateItemVisibility() {
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    if (item.classList.contains("online")) {
      item.style.display = showOnline ? "block" : "none";
    } else if (item.classList.contains("offline")) {
      item.style.display = showOffline ? "block" : "none";
    }
  });

  sortItems();
}