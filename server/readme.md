###Notes
Game representation is

```json
{
    "gameId": "ID Number",
    "gameBoard": "Board Representation",
    "puzzle": "Puzzle Representation",
    "date": "Date Generated",
    "shortestPath": "The Computed Shortest Path",
    "solutions": "The List of Solutions from All Players"
}
```
Solutions representation
 
 ```json
{
    "playerId": "Some way to identify a player",
    "solution": [
        {
            "robot": "Colour",
            "moves": ["N", "E", "S", "W"]
        }
    ]
}
```

Serialization Considerations

Coordinate can be serialized to 1 character, using some base representation. This
means the max board size is limited to 36 (26 chars + 10 numbers). Perhaps look
into other characters that could be used, or a different serialization technique
altogether.

String output should be split into multiple sections, first the board, starting
board size, then all the walls, then potential target locations, then all non-valid
locations. Next the puzzle, with an actual target, and all robot locations.

e.g. 16-16-03A34555AB0B-0F4E-84-3A-A2B443


