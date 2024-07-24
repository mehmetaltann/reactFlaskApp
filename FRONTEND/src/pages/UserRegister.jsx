import HowToRegIcon from "@mui/icons-material/HowToReg";
import useAxios from "../hooks/useAxios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Link,
  Box,
  Container,
} from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Mehmet ALTAN
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const UserRegister = () => {
  const [response, error, loading, axiosFetch, setResponse] = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      id: Math.random().toString(20).slice(2),
      username: data.get("username"),
      password: data.get("password"),
    };
    await axiosFetch({
      method: "POST",
      url: "/kullanıcıekle",
      requestConfig: {
        data: userData,
      },
    });
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kullanıcı Kayıt
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Kayıt Ol
          </Button>
          <Link variant="body2" component={RouterLink} to="/login">
            {"Giriş Sayfası"}
          </Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default UserRegister;
