import React, { useState } from 'react'

import {
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
} from '@material-ui/core'

import { getTargetName, setTarget as setTargetInApp } from './config/target'

export const Target = () => {
    const [target, setTarget] = useState(getTargetName())
    const [selectedTarget, setSelectedTarget] = useState(target)

    const handleChange = event => {
        setSelectedTarget(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()

        setTarget(selectedTarget)

        setTargetInApp(selectedTarget)
    }

    return (
        <div>
            <Typography variant='h5'>Current target is: {target}</Typography>

            <br />

            <form onSubmit={handleSubmit}>
                <FormControl component='fieldset'>
                    <FormLabel component='legend'>API Target</FormLabel>

                    <RadioGroup value={selectedTarget} onChange={handleChange}>
                        <FormControlLabel
                            value='local'
                            control={<Radio />}
                            label='Local'
                        />
                        <FormControlLabel
                            value='production'
                            control={<Radio />}
                            label='Production'
                        />
                    </RadioGroup>

                    <br />

                    <Button
                        variant='contained'
                        disabled={target === selectedTarget}
                        type='submit'
                        color='primary'
                    >
                        Submit!
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}
