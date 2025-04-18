import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import Timer from "@/components/UI/Timer/Timer";
import { ShowQuestion, ShowSuccess } from "@/components/UI/Toast/toast";
import {
  GetInquiryAPI,
  PreTransactionAPI,
  RefundTransactionAPI,
  SetTransactionAPI,
} from "@/services/mini_pay/miniPay.services";
import {
  IGetInquiry,
  IPreTransaction,
  ISetTransaction,
} from "@/types/mini-pay/miniPay.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface IUI {
  step: 1 | 2 | 3;
  get_inquiry: IGetInquiry;
  pre_transaction: IPreTransaction;
  set_transaction: ISetTransaction;
}

export default function MiniPayTransaction() {
  const [alertMessage, setAlertMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      step: 1,
      get_inquiry: {
        // amount: "10000" as any,
        // input: "09113242091",
        amount: "" as any,
        input: "",
        branch_id: "440001",
        branch_name: "string",
        step: 1,
      },
      pre_transaction: {
        credit_amount: "" as any,
        inquiry_id: "",
        default_credit_amount: "" as any,
      },
      set_transaction: {
        pre_transaction_id: "" as any,
        purchase_password: "",
        supplier_transaction_id: 1 as any,
        Param1: 0,
        Param2: 0,
        resend_code_time: undefined as any,
      },
    } as IUI,
    onSubmit(values, formikHelpers) {
      const { step } = values;
      if (step === 1) {
        GetInquiryMutate(values.get_inquiry);
      }
      if (step === 2) {
        ShowQuestion({
          onConfirm() {
            PreTransactionMutate(values.pre_transaction);
          },
        });
      }

      if (step === 3) {
        ShowQuestion({
          onConfirm() {
            SetTransactionMutate(values.set_transaction);
          },
        });
      }
    },
  });

  const {
    mutate: GetInquiryMutate,
    isLoading: GetInquiryLoading,
    error: GetInquiryError,
  } = useMutation({
    mutationFn: GetInquiryAPI,
    onSuccess(data, variables, context) {
      setFieldValue("step", 2);
      setFieldValue("pre_transaction.inquiry_id", data.inquiry_id);
      setFieldValue("pre_transaction.credit_amount", values.get_inquiry.amount);
      setFieldValue(
        "pre_transaction.default_credit_amount",
        data.content.installments_details[0].credit_amount
          .default_credit_amount,
      );
    },
  });

  const {
    mutate: PreTransactionMutate,
    isLoading: PreTransactionLoading,
    error: PreTransactionError,
  } = useMutation({
    mutationFn: PreTransactionAPI,
    onSuccess(data, variables, context) {
      setFieldValue(
        "set_transaction.pre_transaction_id",
        data.content.pre_transaction_id,
      );
      setFieldValue(
        "set_transaction.resend_code_time",
        data.content.purchase_password_details.purchase_password_resend_time,
      );
      setAlertMessage(data.content.purchase_password_message);
      setFieldValue("step", 3);
    },
  });

  const {
    mutate: SetTransactionMutate,
    isLoading: SetTransactionLoading,
    error: SetTransactionError,
  } = useMutation({
    mutationFn: SetTransactionAPI,
    onSuccess(data, variables, context) {
      setAlertMessage("تراکنش با موفقیت انجام شد.");
      resetForm();
    },
  });

  const { values, handleChange, setFieldValue, submitForm, resetForm } = formik;

  return (
    <PageContianer
      title='تراکنش'
      isLoading={GetInquiryLoading || PreTransactionLoading}>
      <FormikProvider value={formik}>
        <Box
          header='تراکنش'
          icon={<Icon icon='mingcute:wechat-pay-fill' />}
          isFieldSet={true}
          alert={{
            message: alertMessage,
            duration: 5000,
            status: "success",
          }}>
          <Grid
            gridColumn={"-1/1"}
            width={values.step > 1 ? "45rem" : "20rem"}
            gridTemplateColumns={`1fr 1fr`}>
            {/* Step 1 */}
            <Grid
              gridColumn={"-1/1"}
              disabled={values.step !== 1}>
              <Box
                header='استعلام کیف پول'
                isFieldSet={true}
                icon={<Icon icon='ix:inquiry-filled' />}>
                <Grid>
                  <Field
                    type='text'
                    name='get_inquiry.input'
                    title='شماره تلفن'
                    icon={<Icon icon='line-md:phone' />}
                    onChange={handleChange}
                    value={values.get_inquiry.input}
                  />
                  <Field
                    type='number'
                    name='get_inquiry.amount'
                    title='مبلغ فاکتور (ریال)'
                    icon={<Icon icon='solar:tag-price-bold' />}
                    onChange={handleChange}
                    value={values.get_inquiry.amount}
                    persianLetterFormmater={true}
                  />
                  <Flex justifyContent='end'>
                    <Button
                      icon={<Icon icon='formkit:submit' />}
                      onClick={submitForm}
                      title='درخواست'
                      variant='success'
                      disabled={values.step !== 1}
                    />
                  </Flex>
                </Grid>
              </Box>
            </Grid>

            {/* Step 2 */}
            <Grid
              expanded={values.step >= 2}
              disabled={values.step > 2}>
              <Box
                header='پیش تراکنش'
                isFieldSet={true}
                icon={<Icon icon='carbon:cics-transaction-server-zos' />}>
                <Grid>
                  <Grid
                    gridColumn={"-1/1"}
                    expanded={!!values.pre_transaction.default_credit_amount}>
                    <Box
                      header='اعتبار کیف پول'
                      icon={<Icon icon='iconoir:credit-card-solid' />}
                      isFieldSet={true}>
                      <Grid
                        color='white'
                        display='flex'
                        justifyContent='end'
                        alignItems='center'
                        gap='0.5rem'>
                        <span>ریال</span>
                        <span>
                          {values.pre_transaction.default_credit_amount.toLocaleString()}
                        </span>
                      </Grid>
                    </Box>
                  </Grid>
                  <Field
                    type='text'
                    name='pre_transaction.inquiry_id'
                    title='شماره فاکتور'
                    icon={<Icon icon='lets-icons:order-fill' />}
                    onChange={handleChange}
                    value={values.pre_transaction.inquiry_id}
                    readOnly={true}
                  />
                  <Field
                    type='number'
                    name='pre_transaction.credit_amount'
                    title='مبلغ فاکتور ( ریال )'
                    icon={<Icon icon='solar:tag-price-bold' />}
                    onChange={handleChange}
                    readOnly={true}
                    value={values.pre_transaction.credit_amount}
                    persianLetterFormmater={true}
                  />
                  <Grid gridTemplateColumns={"1fr 1fr"}>
                    <Button
                      icon={<Icon icon='formkit:submit' />}
                      onClick={resetForm}
                      title='بازگشت'
                      variant='danger'
                    />
                    <Button
                      icon={<Icon icon='formkit:submit' />}
                      onClick={submitForm}
                      title='ارسال کد'
                      variant='success'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Step 3 */}
            <Grid expanded={values.step >= 3}>
              <Box
                header='ثبت نهایی'
                isFieldSet={true}
                icon={<Icon icon='ix:inquiry-filled' />}>
                <Grid>
                  <Field
                    type='number'
                    name='set_transaction.purchase_password'
                    title='کد تایید'
                    icon={<Icon icon='material-symbols:password-2' />}
                    onChange={handleChange}
                    value={values.set_transaction.purchase_password}
                  />

                  <Flex
                    color='white'
                    center
                    gap='1rem'>
                    <Grid
                      cursor='pointer'
                      disabled={values.set_transaction.resend_code_time > 0}>
                      <p
                        onClick={async () => {
                          await GetInquiryMutate(values.get_inquiry);
                          await PreTransactionMutate(values.pre_transaction);
                        }}>
                        ارسال دوباره کد
                      </p>
                    </Grid>
                    <Grid
                      expanded={values.set_transaction.resend_code_time !== 0}>
                      <Timer
                        seconds={values.set_transaction.resend_code_time}
                        onFinish={() => {
                          setFieldValue("set_transaction.resend_code_time", 0);
                        }}
                      />
                    </Grid>
                  </Flex>

                  <Flex
                    center
                    gap='1rem'>
                    <Button
                      icon={<Icon icon='formkit:submit' />}
                      onClick={() => {
                        ShowQuestion({
                          onConfirm() {
                            resetForm();
                          },
                        });
                      }}
                      title='لغو'
                      variant='danger'
                    />
                    <Button
                      icon={<Icon icon='formkit:submit' />}
                      onClick={submitForm}
                      title='تایید'
                      variant='success'
                    />
                  </Flex>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
