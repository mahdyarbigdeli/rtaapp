import Field from "@/components/UI/Field/Field";
import { FormikProvider, useFormik } from "formik";

import { Icon } from "@iconify/react";
import { LoginAPI } from "@/services/auth/auth.services";
import { ILogin } from "@/types/auth.types";
import Button from "@/components/UI/Button/Button";
import { useMutation } from "react-query";
import PageContianer from "@/components/layout/PageContainer/PageContianer";
import { useDispatch } from "react-redux";
import { userActions } from "@/@redux/slices/UserSlice";
import { Navigate, useNavigate } from "react-router-dom";
import useGlobalStates from "@/@redux/hooks/useGlobalStates";
import Grid from "@/components/UI/Grid/Grid";
import Box from "@/components/UI/Box/Box";
import Flex from "@/components/UI/Flex/Flex";

export default function LoginPage() {
  const { user } = useGlobalStates();

  const dispatcher = useDispatch();

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: LoginAPI,
    onSuccess: (data) => {
      // it hast to be changed
      dispatcher(userActions.login(data.data));
      setTimeout(() => {
        // navigate("/channels");
      }, 200);
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    } as ILogin,
    onSubmit(values) {
      mutate(values);
    },
  });

  const { values, handleChange, submitForm } = formik;

  if (user.accessToken) return <Navigate to={"/"} />;

  return (
    <PageContianer
      title='صفحه ورود'
      isLoading={isLoading}>
      <FormikProvider value={formik}>
        <Box
          header='ورود کاربری'
          icon={<Icon icon='material-symbols:login-sharp' />}
          isFieldSet
          style={{
            width: "30rem",
          }}>
          <Grid>
            <Grid>
              <Field
                icon={<Icon icon='solar:user-bold' />}
                name='username'
                onChange={handleChange}
                title='نام کاربری'
                type='text'
                value={values.username}
              />
              <Field
                icon={<Icon icon='mdi:password' />}
                name='password'
                onChange={handleChange}
                title='رمز عبور'
                type='password'
                value={values.password}
              />
            </Grid>
            <Flex justifyContent='end'>
              <Button
                icon={<Icon icon='formkit:submit' />}
                onClick={submitForm}
                title='ورود'
                variant='success'
              />
            </Flex>
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
