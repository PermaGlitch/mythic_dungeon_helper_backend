export type AppError = {
    kind: string;
    retry: boolean;
    status: number;
    cause?: unknown;
    message: string;
    name: "AppError";
};

export const makeAppError = (message: string, opts: { status: number; kind: string; retry?: boolean; cause?: unknown }): AppError => ({
    message,
    kind: opts.kind,
    name: "AppError",
    cause: opts.cause,
    retry: !!opts.retry,
    status: opts.status,
});

export const isAppError = (e: unknown): e is AppError =>
    typeof e === "object" && e !== null && (e as any).name === "AppError";

export const pgErrors = {
    '23505': makeAppError("Duplicate entry.", { status: 409, kind: 'duplicate' }),
    '23503': makeAppError("Invalid reference.", { status: 409, kind: 'fk' }),
    '23502': makeAppError("Required field missing.", { status: 400, kind: 'not_null' }),
    '23514': makeAppError("Invalid value.", { status: 400, kind: 'check' }),
    '22P02': makeAppError("Bad input format.", { status: 400, kind: 'format' }),
    '22001': makeAppError("Value too long.", { status: 400, kind: 'length' }),
    '22003': makeAppError("Number out of range.", { status: 400, kind: 'range' }),
};
