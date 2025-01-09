import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Grid from "@/components/UI/Grid/Grid";
import { IStatusType } from "@/components/UI/Table/Components/Cells/CellStatus/CellStatus";
import { GetTransactionByIdAPI } from "@/services/snapp/transactions.servoces";
import {
  ITransaction,
  transactionsStatus,
} from "@/types/snapp/transactions/transactions.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";
import { useMutation, useQuery } from "react-query";

interface ISearchResult {
  transactionId: string;
  status: string;
  amount: number;
}

interface ISearchTransaction {
  transaction_id: ITransaction["transaction_id"];
  data?: ISearchResult;
}

export default function SearchTransaction() {
  const formik = useFormik({
    initialValues: {} as ISearchTransaction,
    onSubmit(values, formikHelpers) {
      setFieldValue("data", undefined);
      refetch();
    },
  });

  const { values, errors, handleChange, setFieldValue, submitForm } = formik;

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => GetTransactionByIdAPI(values.transaction_id),
    onSuccess(data: any) {
      const response = data?.data.response;
      setFieldValue("data", response);
    },
    enabled: false,
  });

  return (
    <PageContianer
      title='جسجتوی تراکنش'
      isLoading={false}>
      <Box
        header='جسجتوی تراکنش'
        icon={<Icon icon='mi:search' />}
        isFieldSet
        glassMorphism
        style={{
          width: "90dvw",
          maxWidth: "30rem",
        }}>
        <FormikProvider value={formik}>
          <Grid>
            <Grid>
              <Field
                icon={<Icon icon='icon-park-solid:transaction-order' />}
                type='text'
                name='transaction_id'
                onChange={handleChange}
                value={values.transaction_id}
                title='شناسه تراکنش'
              />
              <Button
                icon={<Icon icon='formkit:submit' />}
                onClick={submitForm}
                title='جستجو'
                variant='success'
                disabled={isLoading}
              />
            </Grid>
            <Grid expanded={!!values.data}>
              <Field
                type='text'
                name='transactionId'
                readOnly
                onChange={() => {}}
                value={values?.data?.transactionId}
                icon={<Icon icon='lsicon:order-done-filled' />}
                title='شناسه'
              />
              <Field<IStatusType>
                type='select'
                name='status'
                readOnly
                onChange={() => {}}
                value={transactionsStatus.find((status) => {
                  return values.data?.status === status.value;
                })}
                icon={<Icon icon='grommet-icons:status-unknown' />}
                title='وضعیت'
                options={transactionsStatus}
                selectKeys={{
                  label: "label",
                  value: "value",
                }}
                selectMode='single'
                placeHodler='وضعیت'
              />
              <Field
                type='text'
                name='amount'
                readOnly
                onChange={() => {}}
                value={values?.data?.amount}
                icon={<Icon icon='qlementine-icons:money-16' />}
                title='مقدار'
              />
            </Grid>
          </Grid>
        </FormikProvider>
      </Box>
    </PageContianer>
  );
}
