import "./style.css";
import { TextField, InputLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import changeInputValue from "../../Utils/changeInputValue";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

function InputInstance({
  type,
  label,
  state,
  setState,
  error,
  setError,
  name,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type ? type : "text");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (error) {
      setInputError(error[name].status);
    }
  }, [error]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (inputType.toLowerCase().includes("password")) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  function handleValueChange(e) {
    if (error && inputError) {
      setInputError(false);
      setError({ ...error, [name]: { status: false, message: "" } });
    }
    changeInputValue(e, state, setState);
  }

  return (
    <div className={`input-container`}>
      <InputLabel
        className="input-label"
        error={inputError}
        htmlFor={`${name}-input`}
      >
        {label}
      </InputLabel>
      <TextField
        className="inputInstance"
        name={name}
        placeholder={placeholder}
        type={inputType}
        error={inputError}
        variant="outlined"
        id={`${name}-input`}
        helperText={inputError && error[name].message}
        value={state[name]}
        onChange={(e) => handleValueChange(e)}
        InputProps={{
          endAdornment: (
            <>
              {name.toLowerCase().includes("password") && (
                <InputAdornment
                  position="end"
                  onClick={togglePasswordVisibility}
                >
                  {!showPassword ? (
                    <VisibilityOff className="eyeIcon" />
                  ) : (
                    <Visibility className="eyeIcon" />
                  )}
                </InputAdornment>
              )}
            </>
          ),
        }}
        fullWidth
      />
      {!inputError && <span className="empty" />}
    </div>
  );
}

export default InputInstance;
