import useSWR from "swr";
import { axiosPrivate } from "../api/axios";
// import { useErrorBoundary } from "react-error-boundary";
const fetcher = async (url) => {
  // const { showBoundary } = useErrorBoundary();
  const delay = () => new Promise((res) => setTimeout(() => res(), 3000));

  const controller = new AbortController();
  try {
    await delay();
    const response = await axiosPrivate.get(url, {
      signal: controller.signal,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    // showBoundary(err);
  }
  return () => controller.abort();
};

const useQuestState = () => {
  const { data, error, isLoading } = useSWR("/quest-progress", fetcher);

  return {
    questState: data,
    isLoading,
    isError: error,
  };
};
export default useQuestState;
