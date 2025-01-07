import PageContianer from "@/components/layout/PageContainer/PageContianer";
import SelectModal from "@/components/modals/SelectModal/SelectModal";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Grid from "@/components/UI/Grid/Grid";
import { ShowQuestion } from "@/components/UI/Toast/toast";
import {
  AssigineChannelAPI,
  GetAllUsersAPI,
} from "@/services/auth/auth.services";
import { IAssigineChannel } from "@/types/auth.types";
import { ISelectUser, userColumnDefs } from "@/types/auth/auth.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";

export default function AssigineeUser() {
  const formik = useFormik({
    initialValues: {
      name: "",
    } as IAssigineChannel,
    onSubmit(values, formikHelpers) {
      ShowQuestion({
        onConfirm() {
          assigineChannelMutate({
            ...values,
            user: values.user.id as any,
          });
        },
      });
    },
  });

  const { values, handleChange, submitForm, setFieldValue, errors, isValid } =
    formik;

  const {
    mutate: assigineChannelMutate,
    isLoading: assigineChannelLoading,
    error,
  } = useMutation({
    mutationFn: AssigineChannelAPI,
    onSuccess(data, variables, context) {},
  });

  const [openSelectUserModal, closeSelectUserModal, UserSelectModal] =
    SelectModal<ISelectUser>({
      name: "user",
      title: "انتخاب کاربر",
      isEditable: false,
      type: "single",
      onSubmit: (value) => {
        setFieldValue("user", value);
      },
      api: GetAllUsersAPI,
      colDef: userColumnDefs,
      icon: <Icon icon='flowbite:users-solid' />,
      selectKeys: {
        labelKey: "username",
        valueKey: "id",
      },
      value: values.user,
      validation: {
        message: errors.user as any,
        tooltip: true,
      },
    });

  return (
    <PageContianer
      title='اختصاص دادن کانال'
      isLoading={assigineChannelLoading}>
      <FormikProvider value={formik}>
        <Box
          header='اختصاص دادن کانال'
          isFieldSet
          icon={<Icon icon='fluent:channel-add-16-regular' />}
          style={{
            width: "20rem",
          }}>
          <Grid>
            <Field
              type='text'
              name='name'
              icon={<Icon icon='mdi:rename' />}
              onChange={handleChange}
              value={values.name}
              title='نام کانال'
            />
            <Field<ISelectUser>
              type='modalField'
              name='user'
              icon={<Icon icon='mdi:rename' />}
              onChange={handleChange}
              value={values.user}
              title='نام کاربر'
              editable={true}
              onOpenModal={openSelectUserModal}
              selectKeys={{
                labelKey: "username",
                valueKey: "id",
              }}
              selectMode='single'
              validation={{ message: errors.user as any, tooltip: true }}
            />
            <Button
              icon={<Icon icon='material-symbols:save' />}
              onClick={submitForm}
              title='ذخیره'
              variant='success'
              disabled={isValid === false}
            />
          </Grid>
        </Box>
      </FormikProvider>

      {UserSelectModal()}
    </PageContianer>
  );
}
