import { IMenuItem } from "../interfaces";

function sortByDelivery(a: IMenuItem, b: IMenuItem) {
  if (a.delivery_type < b.delivery_type) return -1;

  if (a.delivery_type === b.delivery_type) return 0;

  return 1;
}

function sortByRating(a: IMenuItem, b: IMenuItem) {
  if (a.rating > b.rating) return -1;

  if (a.rating === b.rating) return 0;

  return 1;
}

function sortByCost(a: IMenuItem, b: IMenuItem) {
  if (a.price < b.price) return -1;

  if (a.price === b.price) return 0;

  return 1;
}

function sortByRelevance(a: IMenuItem, b: IMenuItem) {
  if (a.created_at > b.created_at) return -1;

  if (a.created_at < b.created_at) return 1;

  return 0;
}

export const sortResults = (resultsArr: IMenuItem[], sortCriteria: string) => {
  switch (String(sortCriteria)) {
    case "relevance":
      resultsArr.sort(sortByRelevance);
      break;
    case "delivery":
      resultsArr.sort(sortByDelivery);
      break;
    case "rating":
      resultsArr.sort(sortByRating);
      break;
    case "low-high":
      resultsArr.sort(sortByCost);
      break;
    case "high-low":
      resultsArr.sort(sortByCost).reverse();
      break;
  }

  return resultsArr;
};
