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
