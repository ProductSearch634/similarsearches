export const to = async <T, U = Error>(promise: Promise<T>): Promise<[U | null, T]> =>
  await promise.then(
    (data: T) => [null, data],
    (err: U) => [err, undefined as unknown as T]
  );
