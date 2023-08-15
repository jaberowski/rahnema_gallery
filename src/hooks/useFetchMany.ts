import { useEffect, useState } from "react";

export default function useFetchMany<A>(action: () => Promise<A[]>) {
  const [data, setData] = useState<A[]>([]);
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
