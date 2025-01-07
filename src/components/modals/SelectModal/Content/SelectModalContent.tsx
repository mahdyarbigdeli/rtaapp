import Button from "@/components/UI/Button/Button";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import { ISelectModal } from "../SelectModal.type";
import { useState } from "react";

import styles from "./SelectModalContent.module.scss";
import { ColDef } from "@ag-grid-community/core";
import useTable, {
  IUseTableHookProps,
} from "@/components/UI/Table/Hooks/useTable";
import ListView from "@/components/UI/Table/ListView/ListView";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ISelectModalContentProps<T> {
  api: IUseTableHookProps<T>["api"];
  values: T[];
  onSubmit: (newValues: T[]) => void;
  selectMode: ISelectModal<T>["type"];
  selectKeys: ISelectModal<T>["selectKeys"];
  colDef: ColDef[];
}

export default function SelectModalContent<T>({
  api,
  onSubmit,
  selectKeys,
  selectMode,
  values,
  colDef,
}: ISelectModalContentProps<T>) {
  const {
    currentPage,
    data,
    forceRefresh,
    isLoading,
    meta,
    nextPage,
    setCurrentPage,
    setParams,
    searchs,
    setSearchs,
    setSorts,
    sorts,
  } = useTable({
    api: api,
    initialPage: 1,
    enable: true,
  });

  const [selectedValues, setSelectedValues] = useState<T[]>(values);

  return (
    <Grid>
      <ListView<T>
        colDefs={colDef}
        data={data}
        forceRefresh={forceRefresh}
        isLoading={isLoading}
        onFilterChange={setSearchs}
        onSortChange={() => {}}
        tableKey='table-ag'
        autoHeight={true}
        RowSelectionConfig={{
          defaultSelectedRows: selectedValues,
          labelKey: selectKeys.labelKey,
          onSelectRow(data) {
            if (selectMode === "multi")
              setSelectedValues((prev) => {
                prev.push(data);
                return [...prev];
              });
            if (selectMode === "single") {
              setSelectedValues([]);
              setSelectedValues([data]);
            }
          },
          onUnSelectRow(data) {
            setSelectedValues((prev) => {
              return prev.filter((row: T) => {
                return row[selectKeys.valueKey] !== data[selectKeys.valueKey];
              });
            });
          },
          showSelectCheckBox: true,
          selectMode: selectMode === "single" ? "single" : "multiple",
          valueKey: selectKeys.valueKey,
        }}
        pagination={{
          currentPage,
          meta,
          nextPage,
          setCurrentPage,
        }}
      />

      <Grid gone={selectedValues.length === 0}>
        <Flex
          className={styles.selectedValues}
          maxHeight={"6rem"}
          overflow='auto'
          marginTop={"1rem"}>
          {selectedValues.map((item: T) => {
            const label = item[selectKeys.labelKey] as any;
            const value = item[selectKeys.valueKey] as any;
            return (
              <div
                className={styles.item}
                key={item as any}
                onClick={() =>
                  setSelectedValues((prev) =>
                    prev.filter(
                      (target) => target[selectKeys.valueKey] !== value,
                    ),
                  )
                }>
                <Icon
                  icon='delete'
                  className={styles.delete}
                />
                <span>{label}</span>
              </div>
            );
          })}
        </Flex>
      </Grid>

      <Flex
        marginTop={"1rem"}
        center
        gap='1rem'>
        <Button
          variant='success'
          title='تایید'
          icon={<Icon icon='accept' />}
          onClick={() => onSubmit(selectedValues)}
        />
        <Button
          variant='danger'
          title='لغو'
          icon={<Icon icon='cancel' />}
          onClick={() => {}}
        />
      </Flex>
    </Grid>
  );
}
