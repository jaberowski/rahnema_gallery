import { useEffect, useState } from "react";

export default function useFetch<A>(
  action: () => Promise<A>,
  initializeValue: A
) {
  const [data, setData] = useState<A>(initializeValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    action().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, [action]);

  return { data, isLoading };
}
