import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import Timer from "@/components/UI/Timer/Timer";
import { ShowQuestion } from "@/components/UI/Toast/toast";
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

export default function MiniPayPage() {
  const formik = useFormik({
    initialValues: {
      step: 1,
      get_inquiry: {
        amount: "" as any,
        branch_id: "440001",
        branch_name: "string",
        input: "",
        step: 1,
      },
      pre_transaction: {
        credit_amount: "" as any,
        inquiry_id: "",
      },
      set_transaction: {
        pre_transaction_id: "" as any,
        purchase_password: "",
        supplier_transaction_id: "",
        resend_code_time: 0,
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
      alert("ok");
      console.log(data);
    },
  });

  const {
    mutate: RefundTransactionMutate,
    isLoading: RefundTransactionLoading,
    error: RefundTransactionError,
  } = useMutation({
    mutationFn: RefundTransactionAPI,
    onSuccess(data, variables, context) {
      resetForm();
    },
  });

  const { values, handleChange, setFieldValue, submitForm, resetForm } = formik;

  return (
    <PageContianer
      title='مینی پی'
      isLoading={GetInquiryLoading || PreTransactionLoading}>
      <FormikProvider value={formik}>
        <Box
          header='مینی پی'
          icon={<Icon icon='mingcute:wechat-pay-fill' />}
          isFieldSet={true}>
          <Grid
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
                    title='مبلغ فاکتور (تومان)'
                    icon={<Icon icon='solar:tag-price-bold' />}
                    onChange={handleChange}
                    value={values.get_inquiry.amount}
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
                    title='مقدار فاکتور ( تومان )'
                    icon={<Icon icon='solar:tag-price-bold' />}
                    onChange={handleChange}
                    readOnly={true}
                    value={values.pre_transaction.credit_amount}
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
                  {/* <Field
                    type='text'
                    name='set_transaction.pre_transaction_id'
                    title='شماره پیش تراکنش'
                    icon={<Icon icon='lets-icons:order-fill' />}
                    onChange={handleChange}
                    value={values.set_transaction.pre_transaction_id}
                    readOnly={true}
                  /> */}
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

                  <Grid gridTemplateColumns={"1fr 1fr"}>
                    <Button
                      icon={<Icon icon='formkit:submit' />}
                      onClick={() => {
                        return;
                        ShowQuestion({
                          onConfirm() {
                            RefundTransactionMutate({
                              transaction_id:
                                values.set_transaction.pre_transaction_id,
                            });
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
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
