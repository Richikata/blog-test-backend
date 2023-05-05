export const getResponseFormat = (
  message: string,
  data: any = null,
  error: any = null,
) => ({
  message,
  data,
  error,
});
