import { Stack } from "@mui/material";
import { InputField } from "../../../components/common/InputField";
import { ButtonComponent } from "../../../components/common/Button";
import { useContext, useState } from "react";
import authService from "../../../services/auth/authService";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../../contexts/AuthContext";

type LoginFormType = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = context;

  const { mutate } = useMutation(
    (loginData: LoginFormType) => authService.login(loginData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["login"]);
        login(data);
      },
      onError: (error) => {
        console.error("Login failed", error);
      },
    }
  );
  // console.log(mutation)
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(loginForm);
  };
  return (
    <Stack alignItems="center" justifyContent="center" mt="80px">
      <form onSubmit={handleLoginSubmit}>
        <Stack gap="20px" width="500px">
          <InputField
            label="Email"
            value={loginForm.email}
            name="email"
            onChange={handleLoginChange}
          />
          <InputField
            label="Password"
            value={loginForm.password}
            name="password"
            onChange={handleLoginChange}
          />
          <ButtonComponent variant="contained" type="submit" />
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
