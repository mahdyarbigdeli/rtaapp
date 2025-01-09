import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import CellButton from "@/components/UI/Table/Components/Cells/CellButton/CellButton";
import CellStatus from "@/components/UI/Table/Components/Cells/CellStatus/CellStatus";
import CellContainer from "@/components/UI/Table/Containers/CellContainer/CellContainer";
import useTable from "@/components/UI/Table/Hooks/useTable";
import ListView from "@/components/UI/Table/ListView/ListView";
import { ShowQuestion } from "@/components/UI/Toast/toast";
import { GetAllUsersAPI } from "@/services/auth/auth.services";
import {
  CancelTransactionAPI,
  CreateTransactionsAPI,
  FinalizeTransactionAPI,
  GetAllTransactionsAPI,
} from "@/services/snapp/transactions.servoces";
import { IUser, usersColDef } from "@/types/auth.types";
import {
  ITransaction,
  ITransactionsParams,
  transactionColumnDefs,
} from "@/types/snapp/transactions/transactions.types";
import { ColDef } from "@ag-grid-community/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";

interface IUI extends ITransactionsParams {
  setting: boolean;
}

export default function UsersList() {
  const {
    data,
    currentPage,
    meta,
    nextPage,
    setCurrentPage,
    forceRefresh,
    isLoading,
  } = useTable<IUser>({
    api: GetAllUsersAPI,
    initialPage: 1,
    initialSearchs: {},
    initialSorts: {},
    enable: true,
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: CreateTransactionsAPI,
    onSuccess: () => {
      forceRefresh();
    },
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
      discountAmount: 0,
      paymentMethodTypeDto: "",
      setting: true,
      token: "",
    } as IUI,
    onSubmit() {
      ShowQuestion({
        onConfirm() {
          createMutate(values);
        },
      });
    },
  });

  const { mutate: cancelMutate, isLoading: cancelLoading } = useMutation({
    mutationFn: CancelTransactionAPI,
    onSuccess() {
      forceRefresh();
    },
  });
  const { mutate: finalizeMutate, isLoading: finalizeLoading } = useMutation({
    mutationFn: FinalizeTransactionAPI,
    onSuccess() {
      forceRefresh();
    },
  });

  const colDefs: ColDef[] = [...usersColDef];

  const { values, submitForm, handleChange, setFieldValue } = formik;

  return (
    <PageContianer
      title='لیست کاربران'
      isLoading={
        isLoading || cancelLoading || finalizeLoading || createLoading
      }>
      <FormikProvider value={formik}>
        <Box
          header='لیست کاربران'
          isFieldSet
          icon={<Icon icon='lets-icons:order-fill' />}
          glassMorphism
          style={{
            width: "90dvw",
            maxHeight: "80dvh",
          }}>
          <Grid>
            <ListView
              colDefs={colDefs}
              data={data}
              forceRefresh={forceRefresh}
              isLoading={isLoading}
              onFilterChange={() => {}}
              onSortChange={() => {}}
              autoHeight
              tableKey='transactions-table'
              pagination={{
                currentPage,
                meta,
                nextPage,
                setCurrentPage,
              }}
            />
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
