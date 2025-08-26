type IRange = (from: number, to: number) => number[];
export const range: IRange = (from, to) => [...Array(to - from + 1).keys()].map(i => i + from);
