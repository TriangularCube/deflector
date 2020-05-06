import React from 'react'
import {
    ArrowBack,
    ArrowDownward,
    ArrowForward,
    ArrowUpward,
} from '@material-ui/icons'

export const MoveIcon = props => {
    let colour
    switch (props.colour) {
        case 'green':
            colour = '#40f50f'
            break
        case 'blue':
            colour = '#2da3f1'
            break
        case 'red':
            colour = '#ee1616'
            break
        case 'yellow':
            colour = '#e2d80c'
            break
        case 'silver':
            colour = '#7e7c7c'
            break
    }

    let output
    switch (props.direction) {
        case 'north':
            output = <ArrowUpward style={{ color: colour }} />
            break
        case 'east':
            output = <ArrowForward style={{ color: colour }} />
            break
        case 'south':
            output = <ArrowDownward style={{ color: colour }} />
            break
        case 'west':
            output = <ArrowBack style={{ color: colour }} />
            break
    }

    return output
}
