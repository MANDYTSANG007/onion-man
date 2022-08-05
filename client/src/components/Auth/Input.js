import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const Input = ({ name, handleChange, half, label, autoFocus, type, handleShowPassword}) => {

    return (
        <Grid item xs={half ? 6 : 12} sm={6}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }: null}
            />
        </Grid>
    )
}

export default Input;