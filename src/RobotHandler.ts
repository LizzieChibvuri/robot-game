const fs = require('fs')
import { Direction, Position } from "./models/Position.interface"

export let robotPosition: Position
const maxIndex = 4
const minIndex = 0
const robotNotPlaceValidstionMessage="Invalid move,place robot on board first to proceed"
const fileName = 'robot.txt'

const isRobotPlaced = fs.existsSync(fileName)

export const getRobotGameInfo = () => {
  const instructions = `
    $ node out/robot.js  help   # Show game instructions
    $ node out/robot.js  Place  # Place the robot on the board
    $ node out/robot.js  Move   # Move robot one step in direction its facing
    $ node out/robot.js  Left   # Turn robot 90 degrees left from where its facing
    $ node out/robot.js  Right  # Turn robot 90 degrees to the right of where its facing
    $ node out/robot.js  Report # Display current robot position on board
    $ node out/robot.js  GameOver # Ends the current game and clears old robot position data
    `
  console.log(instructions)
}

export const report = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }
  getRobotPosition()
  console.log(`Output:${robotPosition?.X},${robotPosition?.Y},${robotPosition?.F}`)
}

const getRobotPosition=()=>{
let data = fs.readFileSync(fileName);
robotPosition = JSON.parse(data);
}

export const place = (position: Position) => {

  if (isRobotPlaced === false) {
    let createStream = fs.createWriteStream(fileName);
    createStream.end();
  }
  setRobotPosition(position)
}

export const move = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }

  getRobotPosition()

  if (robotPosition.F === Direction.North) {
    if (isLessThanMaxAllowedIndex(robotPosition.Y))
      robotPosition.Y = robotPosition.Y + 1
  }
  else if (robotPosition.F === Direction.South) {
    if (isGreaterThanMinAllowedIndex(robotPosition.Y))
      robotPosition.Y = robotPosition.Y - 1
  }
  else if (robotPosition.F === Direction.East) {
    if (isLessThanMaxAllowedIndex(robotPosition.X))
      robotPosition.X = robotPosition.X + 1
  }
  else if (robotPosition?.F === Direction.West) {
    if (isGreaterThanMinAllowedIndex(robotPosition.X))
      robotPosition.X = robotPosition.X - 1
  }

  setRobotPosition(robotPosition)
}

export const left = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }
  getRobotPosition()
  if (robotPosition.F === Direction.North)
    robotPosition.F = Direction.West
  else if (robotPosition?.F === Direction.South)
    robotPosition.F = Direction.East
  else if (robotPosition?.F === Direction.East)
    robotPosition.F = Direction.North
  else if (robotPosition?.F === Direction.West)
    robotPosition.F = Direction.South

    setRobotPosition(robotPosition)
}

export const right = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }
  getRobotPosition()
  if (robotPosition.F === Direction.North)
    robotPosition.F = Direction.East
  else if (robotPosition.F === Direction.South)
    robotPosition.F = Direction.West
  else if (robotPosition.F === Direction.East)
    robotPosition.F = Direction.South
  else if (robotPosition.F === Direction.West)
    robotPosition.F = Direction.North

  setRobotPosition(robotPosition)
}

const setRobotPosition = (position: Position) => {
  let data = JSON.stringify(position);
  fs.writeFileSync(fileName, data, { encoding: 'utf8', flag: 'w' });
}

export const deleteRobotDataFile = () => {
  try {
    fs.unlinkSync(fileName)
  } catch (err) {
    console.error(err)
  }
}

const isLessThanMaxAllowedIndex = (index: number) => {
  return index < maxIndex ? true : false
}

const isGreaterThanMinAllowedIndex = (index: number) => {
  return index > minIndex ? true : false
}





