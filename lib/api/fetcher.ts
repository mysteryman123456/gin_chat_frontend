import api from "./axios";

export const fetcher = async <T>(relativeUrl: string): Promise<T> => {
  try {
    const res = await api.get(`${relativeUrl}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error || err.message || "Error fetching data"
    );
  }
};
