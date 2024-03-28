import { useInfiniteQuery } from "@tanstack/react-query";

const limit = 100;

async function fetchPokemonList({ pageParam = 0 }) {
  console.log("FETCHING PAGE: ", pageParam);
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam * limit}`,
  );

  if (!response.ok) {
    throw new Error("Network Error");
  }

  const data: {
    next: string | null;
    results: Array<{ name: string }>;
  } = await response.json();

  return {
    data,
    nextPageNumber: data.next ? pageParam + 1 : null,
  };
}

export function useListData() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemon-list"],
    queryFn: fetchPokemonList,
    initialPageParam: 0,
    getNextPageParam: ({ nextPageNumber }) => nextPageNumber,
  });

  const flatData = data?.pages.flatMap((page) => page.data.results);

  return {
    data: flatData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
