import { useState, useEffect, useCallback } from "react";
import useAxios from "./useAxios";
import useError from "./useError";

const useGetData = (path) => {
  const error = useError();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    axios
      .get(path)
      .then(({ data }) => {
        setRefreshing(false);
        setData(data);
      })
      .catch(() => {
        setRefreshing(false);
        error();
      });
  }, []);

  return [data, setData, handleRefresh, refreshing];
};

export default useGetData;
