export const storeLocalData = async ({ storagename, data }: any) => {
    localStorage.setItem(storagename, JSON.stringify(data));
};

/* export const getLocalData = (storagename: string) => {
    const data = localStorage.getItem(storagename);
    return data ? JSON.parse(data) : null;
};
 */
export const getLocalData = (storagename: string) => {
  try {
    const data = localStorage.getItem(storagename);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error parsing localStorage data for "${storagename}":`, error);
    return null;
  }
};