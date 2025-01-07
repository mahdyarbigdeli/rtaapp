import { memo, useEffect, useState } from "react";
import { ISearchResponse } from "../../../types/Map.type";

import styles from "../styles.module.scss";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { Icon } from "@iconify/react/dist/iconify.js";
import Grid from "@/components/UI/Grid/Grid";

interface ISearchBoxProps {
  initialQuery: string;
  onSearchChange: (value: string) => void;
}

function SearchBox({ initialQuery, onSearchChange }: ISearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ISearchResponse[]>([]);
  const provider = new OpenStreetMapProvider();

  const map = useMap();

  const flyToCordination = (cordination: ISearchResponse) => {
    map.flyTo(
      {
        lat: cordination.y,
        lng: cordination.x,
      },
      14,
    );
  };

  const searchByTitle = async (query: string) => {
    const results = await provider.search({ query });
    if (initialQuery === query) {
      flyToCordination(results[0] as any);
      return;
    }
    setResults(results as any);
  };

  useEffect(() => {
    if (query === "" || query === null) {
      setResults([]);
      return;
    }
    const laodingTimeOut = setTimeout(() => {
      setLoading(true);
      setResults([]);
    }, 200);

    const searchTimeOut = setTimeout(async () => {
      setLoading(false);
      onSearchChange(query);
      searchByTitle(query);
    }, 1000);

    return () => {
      clearTimeout(laodingTimeOut);
      clearTimeout(searchTimeOut);
    };
  }, [query]);

  return (
    <section className={styles.search}>
      <div className={styles.inputBox}>
        <input
          type='text'
          placeholder='جستجو'
          onChange={(event) => {
            setQuery(event.target.value);
            // onSearchChange(event.target.value);
          }}
          defaultValue={query}
        />
        {loading && <Icon icon='line-md:loading-twotone-loop' />}
        {!loading && <Icon icon='material-symbols:search-rounded' />}
      </div>
      <Grid expanded={results.length > 0}>
        <div className={styles.resultsList}>
          {results?.map((item) => {
            return (
              <div
                className={styles.item}
                onClick={() => {
                  flyToCordination(item);
                  setResults([]);
                }}>
                <span>{item.label}</span>
                {<Icon icon='location' />}
              </div>
            );
          })}
        </div>
      </Grid>
    </section>
  );
}

export default memo(SearchBox, (prev, next) => {
  return prev.initialQuery === next.initialQuery;
});
