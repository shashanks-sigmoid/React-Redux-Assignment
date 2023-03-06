import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchInputs, handleInputChange, handleCheckBoxInputChange } from './formSlice';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Checkbox, FormGroup, Typography } from '@mui/material';

function DynamicForm() {

    const form = useSelector(state => state.form)
    const inputs = form.inputs
    const brands = form.formInputs.brands
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchInputs());
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                my: '5rem',
                width: 500,
                mx: 'auto',
                py: '3rem',
                px: '5rem',
                boxShadow: '2px 2px 3px 3px gray',
                bgcolor: '#f8f2f7'
            }}
        >
            <FormControl sx={{ gap: 3, width: 1 }}>
                <Typography
                    variant="h3"
                >
                    Dynamic-Form
                </Typography>
                {form.loading && <div>Loading...</div>}
                {!form.loading && form.error ? <div>Error: {form.error}</div> : null}
                {inputs.map((value, index) => {
                    const inputType = value?.ui_element_type
                    switch (inputType) {
                        case "input_text":
                            return (<TextField
                                key={index}
                                name={value.name}
                                label={value.name}
                                id={value.id}
                                defaultValue={value.defaultVal}
                                variant="standard"
                                type="text"
                                onChange={(events) =>
                                    dispatch(
                                        handleInputChange({
                                            key: value.id,
                                            val: events.target.value,
                                        })
                                    )
                                }
                            />)

                        case "input_number":
                            return (<TextField
                                key={index}
                                name={value.name}
                                label={value.name}
                                id={value.id}
                                defaultValue={value.defaultVal}
                                InputProps={{ inputProps: { min: value.min, max: value.max } }}
                                variant="standard"
                                type="number"
                                onChange={(events) =>
                                    dispatch(
                                        handleInputChange({
                                            key: value.id,
                                            val: events.target.value,
                                        })
                                    )
                                }
                            />)

                        case "input_radio":
                            return (
                                <FormControl
                                    sx={{ flexDirection: 'row', gap: '1rem' }}
                                    key={index}>
                                    <FormLabel
                                        sx={{ alignSelf: 'center' }}
                                        variant='h5'
                                        id={value.id}>{value.name}:</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby={value.id}
                                        defaultValue={value.defaultVal}
                                        name="radio-buttons-group"
                                        sx={{ justifyContent: "center" }}
                                    >
                                        {value.data.map((opt, idx) => {
                                            {/* { console.log(opt.id) } */ }
                                            return (<FormControlLabel
                                                key={idx}
                                                value={opt.id}
                                                label={opt.name}
                                                control={<Radio />}
                                            />)
                                        })}
                                    </RadioGroup>
                                </FormControl>)

                        case "input_dropdown":
                            return (
                                <FormControl
                                    sx={{ flexDirection: 'row', gap: '1rem' }}
                                    key={index}
                                >
                                    <FormLabel
                                        sx={{ alignSelf: 'center' }}
                                        variant='h5'
                                        id={value.id}>{value.name}</FormLabel>
                                    <Select
                                        aria-labelledby={value.id}
                                        defaultValue={value.defaultVal}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {value.data.map((select, idx) => {
                                            return (<MenuItem
                                                key={idx}
                                                value={select.id}
                                            >
                                                {select.name}
                                            </MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>)

                        case "input_checkbox":
                            return (
                                <FormControl
                                    sx={{ flexDirection: 'row', gap: '1rem' }}
                                    key={index}>
                                    <FormLabel
                                        sx={{ alignSelf: 'center' }}
                                        variant='h5'
                                        id={value.id}
                                    >{value.name}</FormLabel>
                                    <FormGroup>
                                        {value.data.map((opt, idx) => {
                                            let checked = brands.includes(opt.id)
                                            return (<FormControlLabel
                                                key={idx}
                                                value={opt.id}
                                                label={opt.name}
                                                control={<Checkbox checked={checked}
                                                    value={opt.id}
                                                    size="small"
                                                    onChange={(events) =>
                                                        dispatch(
                                                            handleCheckBoxInputChange({
                                                                key: value.id,
                                                                val: events.target.value,
                                                                checked: !checked
                                                            })
                                                        )
                                                    }
                                                />}
                                            />)
                                        })}
                                    </FormGroup>
                                </FormControl>)
                    }
                })
                }
                <Button
                    variant='contained'
                    type="submit"
                    size='medium'
                    disabled={form.disabled}
                >
                    Submit
                </Button>
            </FormControl>
        </Box>
    )
}

export default DynamicForm