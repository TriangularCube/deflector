import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { getTargetUrl } from '../config/target.js'
import { GameArea } from './GameArea.jsx'

export const GameScreen = () => {
    const [data, setData] = useState({ loading: true })

    // Parse location and redirect if needed
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if (location.pathname === '/') {
            // If this is the root address, redirect to latest Classic
            fetch(`${getTargetUrl()}/latest/classic`)
                .then(res => res.text())
                .then(res => {
                    history.replace(`/puzzle/classic/${res}`)
                })

            return
        }

        // Once we're past redirects

        // Set up the SSE Stream
        const eventSource = new EventSource(
            `${getTargetUrl()}${location.pathname}`
        )

        // Get the initial game state
        eventSource.addEventListener('initial', event => {
            setData({ loading: false, game: JSON.parse(event.data) })
        })

        // TODO: Error handling
        eventSource.onerror = () => {
            console.error('SSE Dropped')
        }

        // Close the connection on navigate away
        return () => {
            eventSource.close()
        }
    }, [location.pathname])

    return <GameArea game={data.loading ? null : data.game} />
}
