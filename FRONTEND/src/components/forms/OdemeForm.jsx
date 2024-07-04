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
  /*
  
  const validateSchema = Yup.object().shape({
    unvan: Yup.string().required("Gerekli").min(2, "En az 5 Karakter"),
    sistem_id: Yup.string().required("Boş Olamaz"),
    vergi: Yup.string().required("Boş Olamaz"),
    sektor_ismi: Yup.string().required("Boş Olamaz"),
    adres: Yup.string().required("Boş Olamaz"),
    mail: Yup.string().required("Boş Olamaz"),
  });

*/
  let deneme = destekData.filter(
    (item) => item.isim === initialData.destek_isim
  );

  console.log(initialData.destek_isim);

  return (
    <Formik initialValues={initialData} onSubmit={submitHandler}>
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
