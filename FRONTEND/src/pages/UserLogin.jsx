import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAxios from "../hooks/useAxios";
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Box,
  Container,
} from "@mui/material";

const UserLogin = () => {
  const { response, axiosFetch } = useAxios();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    await axiosFetch({
      method: "POST",
      url: "/login",
      requestConfig: {
        data: userData,
      },
    });

    if (response == "var") {
      localStorage.setItem("token", "ad");
      window.location = "/";
    }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kullanıcı Girişi
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
            Giriş
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserLogin;
