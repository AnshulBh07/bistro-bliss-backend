import { IMenuItem, paramsObjectType } from "../interfaces";
import { sortResults } from "./sortResults";

export const filterResults = (
  resultsArr: IMenuItem[],
  paramsObj: paramsObjectType
) => {
  let final = resultsArr;

  if (paramsObj.keyword) {
    final = final.filter((item) => {
      const keyword = paramsObj.keyword!.toLowerCase();
      // we check for the keyword in various fields
      if (item.title.toLowerCase().includes(keyword)) return true;

      if (item.delivery_type.toLowerCase().includes(keyword)) return true;

      if (item.description?.toLowerCase().includes(keyword)) return true;

      for (let i = 0; i < item.category.length; i++) {
        if (item.category[i].toLowerCase().includes(keyword)) return true;
      }

      for (let i = 0; i < item.cuisines.length; i++) {
        if (item.cuisines[i].toLowerCase().includes(keyword)) return true;
      }
      return false;
    });
  }

  // if sort is present
  if (paramsObj.sort) {
    final = sortResults(final, paramsObj.sort.toLowerCase());
  }

  if (paramsObj.delivery) {
    final = final.filter((item) => {
      return item.delivery_type === paramsObj.delivery;
    });
  }

  if (paramsObj.cuisines) {
    final = final.filter((item) => {
      // loop over set cuisines and return true if any of the cuisines match
      for (let i = 0; i < paramsObj.cuisines!.length; i++) {
        if (item.category.includes(paramsObj.cuisines![i])) return true;
      }

      return false;
    });
  }

  if (paramsObj.rating) {
    final = final.filter((item) => {
      return item.rating >= paramsObj.rating!;
    });
  }

  if (paramsObj.veg) {
    final = final.filter((item) => {
      return item.veg === paramsObj.veg;
    });
  }

  if (paramsObj.type) {
    if (paramsObj.type === "all") final = final;
    else
      final = final.filter((item) => {
        return item.category.includes(paramsObj.type!);
      });
  }
  return final;
};
