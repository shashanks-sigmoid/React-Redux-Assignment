import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { margin } from '@mui/system';
import { Typography } from '@mui/material';

function DynamicForm() {

    const [inputs, setInputs] = useState([])

    const fetchApi = () => {

        let url = 'https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669'
        url = 'https://run.mocky.io/v3/7ec8da10-b0ee-4016-86a0-100925968a0c'
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log(response);
                setInputs(response.data)
            })
            .catch((e) => {
                console.log(e.message);
            })

    }

    useEffect(() => {
        fetchApi();
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                my: '5rem',
                mx: '25rem',
                py: '3rem',
                px: '5rem',
                backgroundColor: 'beige',
                boxShadow: '1px 1px 1px gray'
            }}>
            <FormControl sx={{ gap: 3, width: 1 }}>
                <Typography
                    variant="h2"
                    gutterBottom
                >
                    Dynamic-Form
                </Typography>
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
                            />)

                        case "input_radio":
                            return (
                                <FormControl key={index}>
                                    <FormLabel id={value.id}>{value.name}</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby={value.id}
                                        defaultValue={value.defaultVal}
                                        name="radio-buttons-group"
                                        sx={{ justifyContent: "center" }}
                                    >
                                        {value.data.map((opt, idx) => {
                                            { console.log(opt.id) }
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
                                <FormControl key={index}>
                                    <FormLabel id={value.id}>{value.name}</FormLabel>
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
                    }
                })
                }
                <Button
                    variant='contained'
                    // onClick={handleSubmit}
                    size='medium'
                    className='submit-button'>
                    Submit
                </Button>
            </FormControl>
        </Box>
    )
}

export default DynamicForm