Mazes can be loads of fun ... but only if a possible route actually exists. Your job is to write a function that determines whether it's possible to get from a starting point to a predetermined destination for a given maze.

The maze itself is a two-dimensional array, consisting of ones (signifying barriers) and zeros (signifying open space).

Example Maze #1:

[
[1, 0, 0, 1, 1],
[1, 1, 0, 1, 1],
[1, 0, 0, 1, 1],
[1, 0, 1, 1, 0],
[1, 0, 0, 0, 0],
]
You'll receive starting and destination coordinates in as (row, column) notation. This means (0, 2) in the example maze is middle cell in the top row, because the row is 0 and the column is 2. The start and destination coordinates will always have a value of 0.

Your function will determine whether it is possible to get from the starting coordinate to the destination coordinate by only moving across 0-valued cells.

Looking at our example maze again, let's assume that start = (0, 1) and dest = (4, 3). Here's the same maze, but this time the valid path is marked by replacing the 0 value with an asterisk (\*).

[
[1, *, *, 1, 1],
[1, 1, *, 1, 1],
[1, *, *, 1, 1],
[1, *, 1, 1, 0],
[1, *, *, *, 0],
]
Because it's possible to get from the start to the destination by touching only zeros, your function should return true.

Let's try an example where it isn't possible to get from the start to the destination.

Example Maze #2:

[
[1, 0, 0, 1],
[1, 1, 0, 1],
[0, 1, 0, 1],
]
For this maze start = (2, 0) and dest = (0, 1). Given that the starting cell is entirely surrounded by ones, this maze isn't possible to complete.

[
[1, 0, 0, 1],
[1, 1, 0, 1],
[*, 1, 0, 1],
]
Allowed moves:

The only moves allowed are up, down, left, and right. Diagonals are not allowed. For the maze diagram below, assume you're starting on the cell labeled E.

[
[A, B, C],
[D, E, F],
[G, H, J],
]
Starting at E, the valid moves are E -> B, E -> F, E -> H, and E -> D.

Quesstion 2

When planting flowers in a pot, it's important to make sure that whenever you water your plant any water that doesn't get absorbed by the roots drains out the bottom of the pot. Otherwise, the water will pool in the bottom of the pot and cause your plant to rot.

You recently decided to plant some flowers of your own, and decided to fill the base of the pot with gravel. You've decided to write code to verify whether water will successfully drain out of the pot.

Using a 2D array to represent your pot, individual pieces of gravel are notated with a 1 and empty spaces between gravel are notated with a 0.

Example Pot #1:

[
[0, 1, 1, 1, 1],
[0, 1, 0, 0, 0],
[0, 0, 0, 1, 0],
[1, 1, 1, 1, 0],
[1, 0, 0, 1, 0],
]
Write a function to determine whether the water can fall from the top row to the bottom, moving through the spaces between the gravel. Taking the example pot from above, you can see the possible path, which is marked by replacing the relevant 0's with asterisks (\*).

[
[*, 1, 1, 1, 1],
[*, 1, *, *, *],
[*, *, *, 1, *],
[1, 1, 1, 1, *],
[1, 0, 0, 1, *],
]
Notice that the path includes both the top and bottom rows.

Allowed moves:

The only moves allowed are up, down, left, and right. Diagonals are not allowed.

Here are a few pots that don't drain properly, along with explanations.

[
[1, 1, 1],
[1, 1, 0],
[1, 0, 0],
]
Explanation: The top row has no gaps.

[
[1, 1, 0],
[1, 1, 0],
[1, 1, 1],
]
Explanation: The bottom row has no gaps.

[
[1, 1, 0],
[1, 1, 0],
[1, 0, 1],
]
Explanation: Every row has gaps, but gaps in the middle and bottom rows are diagonal from one another, and water can't flow.
