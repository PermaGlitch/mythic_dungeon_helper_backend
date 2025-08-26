import { type Season, getSeasonsList as sGetList } from "../models/seasonModel";

type IGetSeasonsList = (limit?: number, offset?: number) => Promise<Season[]>;
export const getSeasonsList: IGetSeasonsList = (limit, offset) => sGetList(limit, offset);
