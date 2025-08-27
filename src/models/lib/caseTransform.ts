const toCamel = (str: string) => str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

export const keysToCamel = <T extends Record<string, any>>(obj: T): any =>
    Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [toCamel(k), v])
    );

export const rowsToCamel = <T extends Record<string, any>>(rows: T[]) =>
    rows.map(r => keysToCamel(r));
