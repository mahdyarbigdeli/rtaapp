import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import CellButton from "@/components/UI/Table/Components/Cells/CellButton/CellButton";
import CellContainer from "@/components/UI/Table/Containers/CellContainer/CellContainer";
import useTable from "@/components/UI/Table/Hooks/useTable";
import ListView from "@/components/UI/Table/ListView/ListView";
import { ShowQuestion } from "@/components/UI/Toast/toast";
import {
  CancelTransactionAPI,
  FinalizeTransactionAPI,
  GetAllTransactionsAPI,
  mockTransactions,
} from "@/services/snapp/transactions.servoces";
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

export default function TransactionsPage() {
  const {
    data,
    currentPage,
    meta,
    nextPage,
    setCurrentPage,
    forceRefresh,
    isLoading,
  } = useTable<ITransaction>({
    api: GetAllTransactionsAPI,
    initialPage: 1,
    initialSearchs: {},
    initialSorts: {},
    enable: true,
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
      forceRefresh();
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

  const colDefs: ColDef[] = [
    ...transactionColumnDefs,
    {
      headerName: "کنترل ها",
      field: "id",
      minWidth: 300,
      cellRenderer: ({ data }: { data: ITransaction }) => {
        return (
          <CellContainer>
            <CellButton
              icon={<Icon icon='material-symbols:cancel-outline-rounded' />}
              title='لغو تراکنش'
              variant='danger'
              onClick={() => {
                ShowQuestion({
                  onConfirm() {
                    cancelMutate(data.transaction_id.toString());
                  },
                });
              }}
              disabled={data.status !== "PENDING"}
            />
            <CellButton
              icon={<Icon icon='material-symbols:cancel-outline-rounded' />}
              title='نهایی کردن'
              variant='success'
              disabled={data.status !== "PENDING"}
              onClick={() => {
                ShowQuestion({
                  onConfirm() {
                    finalizeMutate(data.transaction_id.toString());
                  },
                });
              }}
            />
          </CellContainer>
        );
      },
    },
  ];

  return (
    <PageContianer
      title='تراکنش ها'
      isLoading={isLoading || cancelLoading || finalizeLoading}>
      <FormikProvider value={formik}>
        <Box
          header='تراکنش ها'
          isFieldSet
          icon={<Icon icon='lets-icons:order-fill' />}
          glassMorphism
          style={{
            width: "90dvw",
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
