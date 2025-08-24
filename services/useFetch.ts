import {useEffect, useRef, useState} from "react";

const useFetch = <T>(fetchFunction : () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null >(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const didRun = useRef(false)

    const fetchData = async () => {

         try {
             setLoading(true);
             setError(null);
             const result = await fetchFunction();
             setData(result);
         }catch (err) {
             // @ts-ignore
             setError(err instanceof Error ? err : new Error('An error occurred'));
         }finally {
             setLoading(false);
         }
    }
    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    }

    useEffect(() => {
        if(autoFetch){
            if (didRun.current) return;   // ← guarda
            didRun.current = true;
            fetchData();
        }
    }, []);
    return {data, error, loading, reset, refetch: fetchData};
}

export default useFetch;