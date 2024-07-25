import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { method, url, requestConfig = {} } = configObj;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        [method.toLowerCase()](url, {
          ...requestConfig,
          signal: ctrl.signal,
        });
      setResponse(res.data);
      setResStatus(res.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return { response, error, loading, axiosFetch, setResponse, resStatus };
};

export default useAxios;
