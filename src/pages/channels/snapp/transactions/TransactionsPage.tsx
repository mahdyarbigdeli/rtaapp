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
import {
  CancelTransactionAPI,
  CreateTransactionsAPI,
  FinalizeTransactionAPI,
  GetAllTransactionsAPI,
  UpdateTransactionStatusAPI,
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

  const { mutate: updateStatusMutate, isLoading: updateMutateLoading } =
    useMutation({
      mutationFn: UpdateTransactionStatusAPI,
      onSuccess() {
        forceRefresh();
      },
    });

  const colDefs: ColDef[] = [
    {
      headerName: "وضعیت",
      field: "status",
      cellRenderer: (props: any) => {
        const transaction_id = props.data.transaction_id;
        return (
          <CellContainer
            // onClick={() => {
            //   ShowQuestion({
            //     onConfirm() {
            //       updateStatusMutate(transaction_id);
            //     },
            //   });
            // }}
            >
            <CellStatus
              defaultValue={props.value}
              options={[
                {
                  icon: <Icon icon='mdi:receipt-text-pending' />,
                  label: "در انتظار",
                  value: "PENDING",
                  variant: "warning",
                },
                {
                  icon: <Icon icon='ic:baseline-cancel' />,
                  label: "لغو شده",
                  value: "CANCEL",
                  variant: "danger",
                },
                {
                  icon: <Icon icon='el:ok-sign' />,
                  label: "تایید شده",
                  value: "SETTLE",
                  variant: "success",
                },
              ]}
            />
          </CellContainer>
        );
      },
    },
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

  const { values, submitForm, handleChange, setFieldValue } = formik;

  return (
    <PageContianer
      title='تراکنش ها'
      isLoading={
        isLoading || cancelLoading || finalizeLoading || createLoading
      }>
      <FormikProvider value={formik}>
        <Box
          header='تراکنش ها'
          isFieldSet
          icon={<Icon icon='lets-icons:order-fill' />}
          glassMorphism
          style={{
            width: "90dvw",
            maxHeight: "80dvh",
          }}>
          <Grid
            gridTemplateColumns={"1fr max-content"}
            alignItems='center'
            responsive={{
              mobile: {
                gridTemplateColumns: "1fr",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              },
            }}>
            <Grid
              gridTemplateColumns={"max-content 15rem 15rem 15rem"}
              gap='1rem'
              alignItems='center'
              expanded={values.setting}
              responsive={{
                mobile: {
                  gridTemplateColumns: "1fr",
                  display: "flex",
                  flexDirection: "column-reverse",
                },
              }}>
              <Button
                icon={<Icon icon='formkit:submit' />}
                onClick={submitForm}
                title='ثبت'
                variant='success'
                disabled={!values.amount || !values.token}
              />
              <Field
                icon={<Icon icon='material-symbols:price-check' />}
                name='amount'
                onChange={handleChange}
                type='number'
                title='مقدار'
                value={values.amount}
              />
              <Field
                icon={<Icon icon='tabler:discount-filled' />}
                name='discountAmount'
                onChange={handleChange}
                title='تخفیف'
                type='text'
                value={values.discountAmount}
              />
              <Field
                icon={<Icon icon='oui:token-key' />}
                name='token'
                onChange={handleChange}
                title='توکن'
                type='text'
                value={values.token}
              />
            </Grid>
            <Flex>
              <Button
                icon={<Icon icon='weui:setting-filled' />}
                onClick={() => {
                  setFieldValue("setting", !values.setting);
                }}
                title='نمایش ایجاد'
                variant='primary'
              />
            </Flex>
          </Grid>
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
