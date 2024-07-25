import * as Yup from "yup";
import FormTextField from "./ui/FormTextField";
import SendIcon from "@mui/icons-material/Send";
import FormSelect from "./ui/FormSelect";
import useAxios from "../../hooks/useAxios";
import { Form, Formik, Field } from "formik";
import { Stack, MenuItem, Button } from "@mui/material";
import { useEffect, useCallback } from "react";

export const IsletmeForm = ({
  initialData,
  submitHandler,
  buttonName = "EKLE",
}) => {
  const { response, loading, axiosFetch } = useAxios();

  const fetchSektorData = useCallback(() => {
    axiosFetch({
      method: "GET",
      url: "/sektordata",
    });
  }, []);

  useEffect(() => {
    fetchSektorData();
  }, []);

  const validateSchema = Yup.object().shape({
    unvan: Yup.string().required("Gerekli").min(2, "En az 5 Karakter"),
    sistemId: Yup.string().required("Boş Olamaz"),
    vergiNo: Yup.string().required("Boş Olamaz").min(10, "En az 10 Karakter"),
    naceKodu: Yup.string().required("Boş Olamaz"),
    adres: Yup.string().required("Boş Olamaz"),
    mail: Yup.string().required("Boş Olamaz"),
  });

  return (
    <Formik
      initialValues={initialData}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
      validateOnChange={false}
    >
      {({ values }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <FormTextField
              sx={{ width: "100%" }}
              name="unvan"
              label="Firma İsmi"
              size="small"
            />
            <Stack direction={"row"} spacing={1}>
              <FormTextField
                sx={{ width: "100%" }}
                name="vergiNo"
                label="Vergi No"
                size="small"
              />
              <FormTextField
                sx={{ width: "100%" }}
                name="sistemId"
                label="Sistem ID"
                size="small"
              />
            </Stack>
            {!loading && (
              <Field name="naceKodu" component={FormSelect} label="Sektör">
                {response?.map(({ isim }, index) => (
                  <MenuItem value={isim} key={index}>
                    {isim}
                  </MenuItem>
                ))}
              </Field>
            )}

            <Stack direction={"row"} spacing={1}>
              <FormTextField
                sx={{ width: "100%" }}
                name="mail"
                label="E-Mail"
                size="small"
              />
              <FormTextField
                sx={{ width: "100%" }}
                name="yetkili"
                label="Yetkili"
                size="small"
              />
            </Stack>

            <Stack direction={"row"} spacing={1}>
              <FormTextField
                sx={{ width: "100%" }}
                name="tel1"
                label="Telefon 1"
                size="small"
              />
              <FormTextField
                sx={{ width: "100%" }}
                name="tel2"
                label="telefon2"
                size="small"
              />
            </Stack>

            <FormTextField
              sx={{ width: "100%" }}
              name="adres"
              label="Adres"
              size="small"
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="notlar"
              label="notlar"
              size="small"
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="uets"
              label="UETS Adresi"
              size="small"
            />
            <Button
              type="submit"
              sx={{ width: "100%" }}
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              {buttonName}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default IsletmeForm;
