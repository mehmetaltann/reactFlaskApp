import * as Yup from "yup";
import FormTextField from "./ui/FormTextField";
import FormDatePicker from "./ui/FormDatePicker";
import SendIcon from "@mui/icons-material/Send";
import FormSelect from "./ui/FormSelect";
import { Form, Formik, Field } from "formik";
import { Stack, MenuItem, Button } from "@mui/material";
import { Fragment } from "react";

const ProjeForm = ({
  destekData,
  initialData,
  submitHandler,
  isletme,
  updateForm = 0,
}) => {
  const validateSchema = Yup.object().shape({
    karekod: Yup.string().required("Boş Olamaz"),
    tutar: Yup.number().required("Boş Olamaz"),
  });

  return (
    <Formik
      initialValues={initialData}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ values }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            {updateForm == 0 && (
              <Fragment>
                <Field name="projeId" component={FormSelect} label="Program">
                  {isletme.projeler?.map(({ program, id }, index) => (
                    <MenuItem value={id} key={index}>
                      {program}
                    </MenuItem>
                  ))}
                </Field>
                <Field name="destek" component={FormSelect} label="Destek">
                  {destekData?.map(({ isim }, index) => (
                    <MenuItem value={isim} default key={index}>
                      {isim}
                    </MenuItem>
                  ))}
                </Field>
              </Fragment>
            )}

            <Stack direction={{ md: "row" }} spacing={1}>
              <FormDatePicker
                sx={{ width: "100%" }}
                name="tarih"
                label="Tarih"
                size="small"
              />
              <FormTextField
                sx={{ width: "100%" }}
                name="karekod"
                label="Karekod"
                size="small"
              />
              <FormTextField
                sx={{ width: "100%" }}
                name="tutar"
                label="Tutar"
                size="small"
                type="number"
              />
            </Stack>
            {updateForm == 1 && (
              <Field name="durum" component={FormSelect} label="Durum">
                <MenuItem value="BEKLEMEDE">BEKLEMEDE</MenuItem>
                <MenuItem value="ÖDENDİ">ÖDENDİ</MenuItem>
              </Field>
            )}

            <Button
              type="submit"
              sx={{ width: "100%" }}
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
            >
              Ekle
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ProjeForm;
