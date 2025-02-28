import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import { ShowQuestion } from "@/components/UI/Toast/toast";
import { RefundTransactionAPI } from "@/services/mini_pay/miniPay.services";
import { IRefundTransaction } from "@/types/mini-pay/miniPay.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";

export default function MiniPayCancelTransaction() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: RefundTransactionAPI,
    onSuccess(data, variables, context) {
    },
  });

  const formik = useFormik({
    initialValues: {
      transaction_id: "",
    } as IRefundTransaction,
    onSubmit(values, formikHelpers) {
      ShowQuestion({
        onConfirm() {
          mutate(values);
        },
      });
    },
  });

  const { values, setFieldValue, resetForm, handleChange, submitForm } = formik;

  return (
    <PageContianer
      title='لغو تراکنش'
      isLoading={isLoading}>
      <FormikProvider value={formik}>
        <Box
          header='لغو تراکنش'
          isFieldSet={true}
          icon={<Icon icon='material-symbols:cancel-rounded' />}
          style={{
            width: "24rem",
          }}>
          <Grid>
            <Field
              type='text'
              name='transaction_id'
              onChange={handleChange}
              value={values.transaction_id}
              icon={<Icon icon='tabler:id' />}
              title='شناسه تراکنش'
            />
            <Flex center>
              <Button
                icon={<Icon icon='ant-design:stop-outlined' />}
                onClick={submitForm}
                title='لغو این تراکنش'
                variant='danger'
              />
            </Flex>
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
