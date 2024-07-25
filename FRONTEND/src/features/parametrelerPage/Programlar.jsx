import * as Yup from "yup";
import FormTextField from "../../components/forms/ui/FormTextField";
import useAxios from "../../hooks/useAxios";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useCallback } from "react";
import {
  Card,
  Typography,
  Stack,
  Button,
  TableRow,
  TableCell,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Form, Formik } from "formik";

const Programlar = () => {
  const { response, loading, axiosFetch } = useAxios();

  const fetchProgramData = useCallback(() => {
    axiosFetch({
      method: "GET",
      url: "/programdata",
    });
  }, [axiosFetch]);

  useEffect(() => {
    fetchProgramData();
  }, []);

  const submitHandler = async (values, { resetForm }) => {
    let programId = "id" + Math.random().toString(20).slice(2);
    const newProgramRecord = { isim: values.isim, id: programId };
    await axiosFetch({
      method: "POST",
      url: "/programdataekle",
      requestConfig: {
        data: newProgramRecord,
      },
    });
    fetchProgramData();
  };

  const validateSchema = Yup.object().shape({
    isim: Yup.string().required("Gerekli").min(4, "En az 4 Karakter"),
  });

  return (
    <Card sx={{ p: 3 }}>
      <Grid container>
        <Grid xs={12}>
          <Typography color={"primary.main"} variant="h6">
            Programlar
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Formik
            initialValues={{
              isim: "",
            }}
            onSubmit={submitHandler}
            validationSchema={validateSchema}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Stack spacing={3} sx={{ p: 2 }}>
                  <FormTextField name="isim" label="İsim" size="small" />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ borderRadius: "5%", minWidth: 120 }}
                    size="large"
                    variant="contained"
                    color={"success"}
                    endIcon={<SendIcon />}
                  >
                    Program Ekle
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid xs={12}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">İsim</TableCell>
                  <TableCell align="center">Sil</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response &&
                  !loading &&
                  response.map(({ id, isim }, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {isim}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={async () => {
                            await axiosFetch({
                              method: "DELETE",
                              url: "/programdatasil/" + id,
                            });
                            fetchProgramData();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Programlar;
