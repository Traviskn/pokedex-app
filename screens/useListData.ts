import { useInfiniteQuery } from "@tanstack/react-query";

const limit = 20;

async function fetchPokemonList({ pageParam = 0 }) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParam * limit}`,
  );

  if (!response.ok) {
    throw new Error("Network Error");
  }

  const data = await response.json();

  return { data, nextPageNumber: pageParam + 1 };
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

  const flatData: Array<{ name: string }> | undefined = data?.pages.flatMap(
    (page) => page.data.results,
  );

  return {
    data: flatData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
