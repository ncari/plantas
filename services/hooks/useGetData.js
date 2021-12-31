import { useState, useEffect, useContext, useCallback } from "react";
import { Get } from "../apicall";

import context from "../context";

const useGetData = (path) => {
  const { token, setError } = useContext(context);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Get(path, token)
      .then(({ data }) => {
        setRefreshing(false);
        setData(data);
      })
      .catch(() => {
        setRefreshing(false);
        setError();
      });
  }, []);

  return [data, setData, handleRefresh, refreshing];
};

export default useGetData;
