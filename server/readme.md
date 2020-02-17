###Notes

Game representation is

```json
{
    "gameId": number,
    "gameBoard": board representation,
    "date": when the game was generated,
    "shortestPath": computed shortest path,
    "solutions": list of solutions by players
}
```
Solutions representation
 
 ```json
{
    "playerId": username, or some other identifier,
    "solution": [
        {
            "robot": color,
            "moves": [N, E, W, S]
        }
    ]
}
```

Board representation considerations

The board is 16 x 16, which means each coordinate could be represented by
two hex characters. e.g. 8A would be (8, 11).  
Walls are in between two spaces, which means it could be represented by 4
character hex. e.g. 03A3 would be a wall between (10, 3) and (11, 3)

Board could then be split into three sections, first all the walls, then
target locations, then robot starting locations.

e.g. 03A34555AB0B-0F4E-84 
