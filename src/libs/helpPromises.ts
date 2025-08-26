type IResolvePromisesSequentially = (tasks: Promise<any>[]) => Promise<void>;
export const resolvePromisesSequentially: IResolvePromisesSequentially = async (tasks) => {
    for (const task of tasks) await task;
};
