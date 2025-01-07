import PageContianer from "@/components/layout/PageContainer/PageContianer";
import Box from "@/components/UI/Box/Box";
import Button from "@/components/UI/Button/Button";
import Field from "@/components/UI/Field/Field";
import Flex from "@/components/UI/Flex/Flex";
import Grid from "@/components/UI/Grid/Grid";
import Map from "@/components/UI/Map/Map";
import LocationMarker from "@/components/UI/Map/Plugins/LocationMarker/LocationMarker";
import SearchBox from "@/components/UI/Map/Plugins/LocationSearch/components/SearchBox";
import { ShowQuestion } from "@/components/UI/Toast/toast";
import { RegisterAPI } from "@/services/auth/auth.services";
import { IUserCU } from "@/types/users/users.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";

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
    onSubmit(values) {
      ShowQuestion({
        onConfirm() {
          registerMutate({
            ...values,
            role: (values.role as any).value,
          });
        },
      });
    },
  });

  const { values, handleChange, submitForm, setFieldValue } = formik;

  const { mutate: registerMutate, isLoading: registerIsLoading } = useMutation({
    mutationFn: RegisterAPI,
    onSuccess(data, variables, context) {},
  });

  console.log(values);

  return (
    <PageContianer
      title='ایجاد کاربر'
      isLoading={registerIsLoading}>
      <FormikProvider value={formik}>
        <Box
          glassMorphism
          icon={<Icon icon='gridicons:add' />}
          header='ایجاد کاربری'
          isFieldSet
          style={{
            width: "max-content",
            maxHeight: "80dvh",
          }}>
          <Grid gap='0'>
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
                      setFieldValue("admin_profile", undefined);
                      setFieldValue("customer_profile", undefined);
                      setFieldValue("supplier_profile", undefined);
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
            <Grid
              expanded={(values.role as any).value === "admin"}
              marginTop={"1rem"}>
              <Box
                header='اطلاعات مدیر'
                isFieldSet
                icon={<Icon icon='material-symbols:admin-panel-settings' />}>
                <Grid>
                  <Grid gridTemplateColumns={"1fr 1fr"}>
                    <Field
                      type='text'
                      name='admin_profile.full_name'
                      onChange={handleChange}
                      value={values.admin_profile?.full_name}
                      title='نام کامل مدیر'
                      icon={<Icon icon='icon-park-outline:edit-name' />}
                    />
                    <Field
                      type='number'
                      name='admin_profile.phone_number'
                      onChange={handleChange}
                      value={values.admin_profile?.phone_number}
                      title='شماره تلفن'
                      icon={<Icon icon='line-md:phone-filled' />}
                    />
                  </Grid>
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
              </Box>
            </Grid>

            {/* Supplier */}
            <Grid
              expanded={(values.role as any).value === "supplier"}
              marginTop={"1rem"}>
              <Box
                header='اطلاعات فروشنده'
                isFieldSet
                icon={<Icon icon='solar:user-bold' />}>
                <Grid gridTemplateColumns={"1fr 1fr"}>
                  <Grid
                    gridColumn={"-1/1"}
                    height={"20rem"}
                    borderRadius={"1rem"}
                    overflow='hidden'>
                    <Map
                      defaultLocation={{
                        lat: 50,
                        lng: 50,
                      }}>
                      <SearchBox
                        initialQuery='تهران'
                        onSearchChange={(value) => {}}
                      />
                      <LocationMarker
                        events={{
                          onCancel(cordinations) {},
                          onSelectLocations(cordinations) {
                            const latLng = cordinations[0];
                            setFieldValue("supplier_profile.lng", latLng.lng);
                            setFieldValue("supplier_profile.lat", latLng.lat);
                          },
                          onSubmit(cordinations) {},
                        }}
                        intialPositions={[]}
                        mode='get'
                        selectCount={1}
                      />
                    </Map>
                  </Grid>

                  <Grid
                    gridColumn={"-1/1"}
                    gridTemplateColumns={"1fr 1fr"}>
                    <Field
                      type='text'
                      name='supplier_profile.lat'
                      onChange={handleChange}
                      value={values.supplier_profile?.lat || ""}
                      icon={<Icon icon='mdi:latitude' />}
                      title='عرض جغرافیایی'
                      disabled
                    />
                    <Field
                      type='text'
                      name='supplier_profile.lng'
                      onChange={handleChange}
                      value={values.supplier_profile?.lng || ""}
                      icon={<Icon icon='mdi:longitude' />}
                      title='طول جغرافیایی'
                      disabled

                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='supplier_profile.company_name'
                      onChange={handleChange}
                      value={values.supplier_profile?.company_name || ""}
                      icon={<Icon icon='mdi:office-building' />}
                      title='نام شرکت'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='supplier_profile.contact_person_name'
                      onChange={handleChange}
                      value={values.supplier_profile?.contact_person_name || ""}
                      icon={<Icon icon='mdi:account' />}
                      title='نام شخص تماس'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='supplier_profile.phone_number'
                      onChange={handleChange}
                      value={values.supplier_profile?.phone_number || ""}
                      icon={<Icon icon='mdi:phone' />}
                      title='شماره تلفن'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='supplier_profile.business_registration_number'
                      onChange={handleChange}
                      value={
                        values.supplier_profile?.business_registration_number ||
                        ""
                      }
                      icon={<Icon icon='mdi:file-document-box' />}
                      title='شماره ثبت کسب‌وکار'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='supplier_profile.business_address'
                      onChange={handleChange}
                      value={values.supplier_profile?.business_address || ""}
                      icon={<Icon icon='mdi:map-marker' />}
                      title='آدرس کسب‌وکار'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='supplier_profile.tax_id'
                      onChange={handleChange}
                      value={values.supplier_profile?.tax_id || ""}
                      icon={<Icon icon='mdi:cash-register' />}
                      title='شناسه مالیاتی'
                    />
                  </Grid>

                  <Grid gridColumn={"-1/1"}>
                    <Box
                      header='عکس پروفایل'
                      isFieldSet
                      icon={<Icon icon='line-md:image' />}>
                      <Grid
                        gridTemplateColumns={"1fr 7rem"}
                        alignItems='center'>
                        <Field
                          type='file'
                          name='supplier_profile.profile_picture'
                          onChange={(e) => {
                            setFieldValue(
                              "supplier_profile.profile_picture",
                              e,
                            );
                          }}
                          value={values.supplier_profile?.profile_picture}
                          title='فایل عکس'
                          accept='image/*'
                          selectMode='single'
                        />
                        <Field
                          type='image-preview'
                          name='supplier_profile.profile_picture'
                          value={values.supplier_profile?.profile_picture}
                          title='عکس'
                          icon={<Icon icon='line-md:image' />}
                        />
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Customer */}
            <Grid
              expanded={(values.role as any).value === "customer"}
              marginTop={"1rem"}>
              <Box
                header='اطلاعات مشتری'
                icon={<Icon icon='carbon:customer' />}
                isFieldSet>
                <Grid gridTemplateColumns={"1fr 1fr"}>
                  <Grid gridColumn={"-1/1"}>
                    <Box
                      header='عکس پروفایل'
                      isFieldSet
                      icon={<Icon icon='line-md:image' />}>
                      <Grid
                        gridTemplateColumns={"1fr 7rem"}
                        alignItems='center'>
                        <Field
                          type='file'
                          name='customer_profile.profile_picture'
                          onChange={(e) => {
                            setFieldValue(
                              "customer_profile.profile_picture",
                              e,
                            );
                          }}
                          value={values.customer_profile?.profile_picture}
                          title='فایل عکس'
                          accept='image/*'
                          selectMode='single'
                        />
                        <Field
                          type='image-preview'
                          name='customer_profile.profile_picture'
                          value={values.customer_profile?.profile_picture}
                          title='عکس'
                          icon={<Icon icon='line-md:image' />}
                        />
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid>
                    <Field
                      type='text'
                      name='customer_profile.full_name'
                      onChange={handleChange}
                      value={values.customer_profile?.full_name || ""}
                      icon={<Icon icon='mdi:account' />}
                      title='نام کامل'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='customer_profile.phone_number'
                      onChange={handleChange}
                      value={values.customer_profile?.phone_number || ""}
                      icon={<Icon icon='mdi:phone' />}
                      title='شماره تلفن'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='customer_profile.shipping_address'
                      onChange={handleChange}
                      value={values.customer_profile?.shipping_address || ""}
                      icon={<Icon icon='mdi:truck-delivery-outline' />}
                      title='آدرس ارسال'
                    />
                  </Grid>

                  <Grid>
                    <Field
                      type='text'
                      name='customer_profile.billing_address'
                      onChange={handleChange}
                      value={values.customer_profile?.billing_address || ""}
                      icon={<Icon icon='mdi:cash-register' />}
                      title='آدرس صورتحساب'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Flex
              marginTop={"1rem"}
              justifyContent='end'>
              <Button
                icon={<Icon icon='formkit:submit' />}
                onClick={submitForm}
                title='ثبت'
                variant='success'
              />
            </Flex>
          </Grid>
        </Box>
      </FormikProvider>
    </PageContianer>
  );
}
