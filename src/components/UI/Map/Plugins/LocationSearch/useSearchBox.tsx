import { ISearchResponse } from "../../types/Map.type";
import SearchBox from "./components/SearchBox";

interface ISearchComponentProps {
  initialQuery: string;
  onSearchChange: (query: string) => void;
  onResultSelect: (target: ISearchResponse) => void;
}

export default function useSearchBox({ initialQuery }: ISearchComponentProps) {
  const SearchLocationComponent = () => {
    return (
      <SearchBox
        initialQuery={initialQuery}
        onSearchChange={() => {}}
      />
    );
  };

  const SearchLocation = () => {
    alert("ok");
  };

  return { SearchLocationComponent, SearchLocation };
}
