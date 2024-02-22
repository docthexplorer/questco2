import React, { useEffect } from "react";

const useQuestFetcher = (url) => {

  const questFetcher = () => {

    useEffect(() => {
      const controller = new AbortController();
      let isMounted = true;

      const fetchQuests = async () => {
        try {
          const response = await axiosPrivate.get(`/${url}`, {
            signal: controller.signal,
          });
          console.log(response.data);
          isMounted &&
            setTimeout(() => {
              setAllQuests(response.data);
            }, 2000);
        } catch (err) {
          if (err.name !== "CanceledError") {
            setAuthExpires(true);
            return navigate("/", { state: { from: location }, replace: true });
          }
          console.error(err);
        }
      };
      fetchQuests();
      return () => {
        isMounted = false;
        controller.abort();
      };
    }, []);
  };

  return questFetcher;
}
export default useQuestFetcher;
