import { type Expansion, getExpansionsList as eGetList } from "../models/expansionModel";

type IGetExpansionsList = (limit?: number, offset?: number) => Promise<Expansion[]>;
export const getExpansionsList: IGetExpansionsList = (limit, offset) => eGetList(limit, offset);
