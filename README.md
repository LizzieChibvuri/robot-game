# robot-game

A simulation of a toy robot moving on a square tabletop, of dimensions
5 units x 5 units.

The origin (0,0) can be considered to be the SOUTH WEST most corner.
The first valid command to the robot is a PLACE command, after that, any sequence of commands may
be issued, in any order, including another PLACE command. The application should discard
all commands in the sequence until a valid PLACE command has been executed.

## Installation

git clone https://github.com/LizzieChibvuri/robot-game.git

npm i

npm run build

$ node out/robot.js help #lists game commands


## Usage

Commands:
Place X,Y,F
MOVE
RIGHT
LEFT
REPORT

Run the commands as follows in command line
    $ node out/robot.js help   # Show game instructions
    $ node out/robot.js Place  # Place the robot on the board at given position facing supplied direction
    $ node out/robot.js Move   # Move robot one step in direction its facing
    $ node out/robot.js Left   # Turn robot 90 degrees left from where its facing
    $ node out/robot.js Right  # Turn robot 90 degrees to the right of where its facing
    $ node out/robot.js Report # Display current robot position on board
    $ node out/robot.js GameOver # Ends the current game and clears old robot position data

## Data Storage
On Placing robot robot.txt is created in the root of the project with robot position data
To Clear game and restart use GameOver command
Test Scenarios are in commands.txt
