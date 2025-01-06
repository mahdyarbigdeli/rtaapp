import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Grid from "@/components/UI/Grid/Grid";
import { IUserCU } from "@/types/users/users.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";

export default function CreateUser() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
      username: "",
      admin_profile: undefined,
      customer_profile: undefined,
      supplier_profile: undefined,
    } as IUserCU,
    onSubmit(values, formikHelpers) {},
  });

  const { values, handleChange, submitForm, setFieldValue } = formik;

  return (
    <PageContianer title='ایجاد کاربر'>
      <FormikProvider value={formik}>
        <Box
          glassMorphism
          icon={<Icon icon='gridicons:add' />}
          header='ایجاد کاربری'
          isFieldSet
          style={{
            width: "40rem",
          }}>
          <Grid>
            <Box
              header='فیلد های اجباری'
              isFieldSet
              icon={<Icon icon='mdi:required-circle' />}>
              <Grid gridTemplateColumns={"1fr 1fr"}>
                <Grid>
                  <Field
                    type='text'
                    name='username'
                    onChange={handleChange}
                    value={values.username}
                    icon={<Icon icon='solar:user-bold' />}
                    title='نام کاربری'
                  />
                </Grid>

                <Grid>
                  <Field
                    type='text'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    icon={<Icon icon='material-symbols:attach-email-rounded' />}
                    title='ایمیل'
                  />
                </Grid>

                <Grid>
                  <Field
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    title='گذرواژه'
                    icon={<Icon icon='mdi:password' />}
                  />
                </Grid>

                <Grid>
                  <Field<{ label: string; value: string }>
                    type='select'
                    name='role'
                    onChange={(value) => {
                      setFieldValue("role", value);
                    }}
                    value={values.role}
                    icon={<Icon icon='oui:app-users-roles' />}
                    title='نقش'
                    options={[
                      {
                        label: "مدیر",
                        value: "admin",
                      },
                      {
                        label: "فروشنده",
                        value: "supplier",
                      },
                      {
                        label: "مشتری",
                        value: "customer",
                      },
                    ]}
                    selectMode='single'
                    selectKeys={{
                      label: "label",
                      value: "value",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Admin */}
            <Grid expanded={(values.role as any).value === "admin"}>
              <Field
                type='text'
                name='admin_profile.full_name'
                onChange={handleChange}
                value={values.admin_profile?.full_name}
                title='نام کامل مدیر'
              />
              <Box
                header='عکس پروفایل'
                isFieldSet
                icon={<Icon icon='line-md:image' />}>
                <Grid
                  gridTemplateColumns={"1fr 7rem"}
                  alignItems='center'>
                  <Field
                    type='file'
                    name='admin_profile.profile_picture'
                    onChange={(e) => {
                      setFieldValue("admin_profile.profile_picture", e);
                    }}
                    value={values.admin_profile?.profile_picture}
                    title='فایل عکس'
                    accept='image/*'
                    selectMode='single'
                  />
                  <Field
                    type='image-preview'
                    name='admin_profile.profile_picture'
                    value={values.admin_profile?.profile_picture}
                    title='عکس'
                    icon={<Icon icon='line-md:image' />}
                  />
                </Grid>
              </Box>
            </Grid>

            {/* Supplier */}
            <Grid>
              <Grid>
                <Field
                  type='text'
                  name='supplier_profile.company_name'
                  onChange={handleChange}
                  value={values.supplier_profile?.company_name}
                  title='نام شرکت'
                />
              </Grid>
              <Grid>
                <Field
                  type='text'
                  name='supplier_profile.contact_person_name'
                  onChange={handleChange}
                  value={values.supplier_profile?.contact_person_name}
                  title='نام شخص تماس'
                />
              </Grid>
            </Grid>

            {/* Customer */}
            <Grid expanded={values.role === "customer"}>
              <Grid>
                <Field
                  type='text'
                  name='customer_profile.full_name'
                  onChange={handleChange}
                  value={values.customer_profile?.full_name}
                  title='نام کامل مشتری'
                />
              </Grid>
              <Grid>
                <Field
                  type='text'
                  name='customer_profile.phone_number'
                  onChange={handleChange}
                  value={values.customer_profile?.phone_number}
                  title='شماره تماس'
                />
              </Grid>
            </Grid>

            <Grid>
              <Button
                icon={<Icon icon='formkit:submit' />}
                onClick={() => {}}
                title='ثبت'
                variant='success'
              />
            </Grid>
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
