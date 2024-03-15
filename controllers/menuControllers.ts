import { Request, Response } from "express";
import { IMenuItem, paramsObjectType } from "../interfaces";
import Menu from "../models/menu";
import { filterResults } from "../services/filterResults";

export const getAllMenu = async (req: Request, res: Response) => {
  const { page, paramsObject } = req.query;
  // console.log(req.query);
  let paramsObj: paramsObjectType, pageNum: number;

  // if (!page) {
  //   res.send("page number not available").status(500);
  //   return;
  // }

  pageNum = Number(page);

  if (paramsObject) paramsObj = JSON.parse(String(paramsObject));

  try {
    let results: IMenuItem[] = await Menu.find({});

    // now let us filter this data
    if (paramsObject) results = filterResults(results, paramsObj!);

    // apply pagination
    if (page) results = results.slice(8 * pageNum, 8 * pageNum + 8);
    console.log(results.length);

    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
