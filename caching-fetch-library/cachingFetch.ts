import { useState, useEffect } from 'react';

// You may edit this file, add new files to support this file,
// and/or add new dependencies to the project as you see fit.
// However, you must not change the surface API presented from this file,
// and you should not need to change any other files in the project to complete the challenge

// type for the useCachingFetch hook
type FetchResult = {
  isLoading: boolean;
  data: any[];
  error: Error | null;
};

// create cache object for client
const cache: { [url: string]: FetchResult } = {};

export const useCachingFetch = (url: string): FetchResult => {
  // useState hook to store the result without returning it immediately
  const [result, setResult] = useState<FetchResult>({
    isLoading: true,
    data: [],
    error: null,
  });

  // useEffect hook to fetch the data from the url
  useEffect(() => {
    if (cache[url]) {
      // return cached data if it exists
      setResult(cache[url]);
      return;
    }

    // async function to fetch the data
    const fetchData = async () => {
      // set initial result state
      setResult({ isLoading: true, data: [], error: null });

      try {
        // fetch the data from the url
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // parse the response
        const data = await response.json();

        // return the successfully fetched data
        const result: FetchResult = { isLoading: false, data, error: null };

        // store the result in the cache
        cache[url] = result;

        // set the result state
        setResult(result);
      } catch (error) {
        // return the error if the fetch fails
        const result: FetchResult = { isLoading: false, data: [], error: error as Error };

        // store the result in the cache
        cache[url] = result;

        // set the result state
        setResult(result);
      }
    };

    fetchData();
  }, [url]);

  return result;
};

/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 *
 * This function will be called once on the server before any rendering occurs.
 *
 * Any subsequent call to useCachingFetch should result in the returned data being available immediately.
 * Meaning that the page should be completely serverside rendered on /appWithSSRData
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript disabled, you should see a list of people.
 * 2. You have not changed any code outside of this file to achieve this.
 * 3. This file passes a type-check.
 *
 */

// initialize cache for server
let cachedData: [] | null = null;

async function preloadData(url: string) {
  if (!cachedData) {
    const response = await fetch(url, {
      cache: "force-cache"
    });
    
    cachedData = await response.json();

    // handle error if network request fails
    if (!response.ok) {
      throw new Error('Network error');
    } 
  }
}

export const preloadCachingFetch = async (url: string): Promise<[]> => {
  if (cachedData) {
    return Promise.resolve(cachedData);
  } else {
    await preloadData(url);
    cachedData = cachedData || [];

    return cachedData as [];
  }
};

/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const serializeCache = (): string => '';

export const initializeCache = (serializedCache: string): void => {};

export const wipeCache = (): void => {};
