import * as Yup from "yup";
import FormTextField from "./ui/FormTextField";
import FormDatePicker from "./ui/FormDatePicker";
import SendIcon from "@mui/icons-material/Send";
import FormSelect from "./ui/FormSelect";
import { Form, Formik, Field } from "formik";
import { Stack, MenuItem, Button } from "@mui/material";

const ProjeForm = ({
  programData,
  initialData,
  submitHandler,
  updateForm = 0,
}) => {
  return (
    <Formik initialValues={initialData} onSubmit={submitHandler}>
      {({ values }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1, pt: 1 }}>
            {updateForm == 0 && (
              <Field name="program" component={FormSelect} label="Program">
                {programData?.map(({ isim }, index) => (
                  <MenuItem value={isim} key={index}>
                    {isim}
                  </MenuItem>
                ))}
              </Field>
            )}
            <Stack direction={"row"} spacing={1}>
              <FormDatePicker
                sx={{ width: "100%" }}
                name="baslamaTarihi"
                label="Başlama Tarihi"
                size="small"
              />
              <FormTextField name="sure" label="Süresi (ay)" size="small" />
              <FormDatePicker
                sx={{ width: "100%" }}
                name="tamamlanmaTarihi"
                label="Tamamalanma Tarihi"
                size="small"
              />
            </Stack>

            <FormDatePicker
              name="takipTarihi"
              label="Takip Tarihi"
              size="small"
            />
            <Stack direction={"row"} spacing={1}>
              <FormTextField
                sx={{ width: "100%" }}
                name="izleyici"
                label="İzleyici"
                size="small"
              />
              <FormTextField
                sx={{ width: "100%" }}
                name="notlar"
                label="Not"
                size="small"
              />
            </Stack>
            {updateForm == 1 && (
              <Field name="durum" component={FormSelect} label="Durum">
                <MenuItem value="Devam Ediyor">Devam Ediyor</MenuItem>
                <MenuItem value="Başarıyla Tamamlandı">
                  Başarıyla Tamamlandı
                </MenuItem>
                <MenuItem value="Başarısız Tamamlandı">
                  Başarısız Tamamlandı
                </MenuItem>
                <MenuItem value="Durduruldu">Durduruldu</MenuItem>
                <MenuItem value="Bilgi Yok">Bilgi Yok</MenuItem>
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
