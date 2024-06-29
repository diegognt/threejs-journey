export const hasDebugMode = (): boolean => {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.has("debug", "true");
};
