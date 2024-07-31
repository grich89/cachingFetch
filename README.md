```sh {"id":"01J42N8ETCHT8XNTY6X0CCSJBE"}
## useCachingFetch

# Imported useEffect and useState from react to store the result without returning it immediately and thus breaking the isLoading boolean
# Set the initial state of the result to the required format for the type
# If the cache is not empty, return the cached data
# Otherwise, use fetch to get the data from the API
# Handle response errors if fetch fails. Otherwise, set the result to the returned data from the api and store the data in the cache
# Catch any other errors and log them in the error state in the response object
# Return the result object
```

```sh {"id":"01J451QW0CRWWV14MDKK40B1TM"}
## preloadCachingFetch

# Check if cachedData is not empty, and resolve the promise with it if it is not
# Otherwise, call the preloadData function which will fetch the data and store it in the cachedData object
```