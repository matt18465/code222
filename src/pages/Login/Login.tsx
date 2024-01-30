import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { Loading } from "../../components/Loading/Loading";
import { useAuthContext } from "../../state/auth-context";
import styles from "./Login.module.scss";
import { RoutePathname } from "../../utils/routing";
import { useClientContext } from "../../state/client-context";
import { appConfig } from "../../app.config";

export const LoginPage = () => {
  const { user, loading, signIn } = useAuthContext();
  const { changePrefix } = useClientContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const toggleForm = () => {
    setRegistration(!registration);
    setShowError(false);
  };

  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data: any) => {
    setButtonLoading(true);
    setShowError(false);
    signIn?.(data.email, data.password, data.rememberMe).then((user) => {
      if (user) {
        changePrefix?.(appConfig.CLIENT_PREFIX);
        navigate(RoutePathname.Home);
      } else {
        setShowError(true);
        setButtonLoading(false);
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (user) {
    navigate(RoutePathname.Home);
  }

  return (
    <div className={styles.root}>
      <div className={styles.image}></div>
      <div className={styles.formContainer}>
        <Stack
          sx={{ maxWidth: 400, color: "text.secondary" }}
          component="form"
          spacing={3}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h4" align="center">
            EMACS
          </Typography>
          <Typography fontSize={18} align="center">
            {registration
              ? "Create an account"
              : "Welcome back! Please login to your account"}
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            {...register("email")}
          />
          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="standard"
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Show password"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...register("rememberMe")} />}
                label="Remember me"
              />
            )}
          />
          {showError && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ErrorIcon color="error" />
              <Typography color="error">
                {registration ? "Sign up" : "Login"} error
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              disabled={buttonLoading}
              sx={{ flex: 1, textTransform: "none" }}
              disableElevation
              color="info"
              variant="contained"
              size="large"
            >
              {registration ? "Sign up" : "Login"}
            </Button>
            <Button
              disabled
              onClick={toggleForm}
              sx={{ flex: 1, textTransform: "none" }}
              disableElevation
              color="info"
              variant="outlined"
              size="large"
            >
              {registration ? "Back to login" : "Sign up"}
            </Button>
          </Box>
        </Stack>
      </div>
    </div>
  );
};
