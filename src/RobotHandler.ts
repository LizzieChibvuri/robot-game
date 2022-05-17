const fs = require('fs')
import { Direction, Position } from "./models/Position.interface"

export let robotPosition: Position
const maxIndex = 4
const minIndex = 0
const robotNotPlaceValidstionMessage="Invalid move,place robot on board first to proceed"
const fileName = 'robot.txt'

const fileExists = () => {
  return fs.existsSync(fileName)
}
var isRobotPlaced = fileExists()
export const getRobotGameInfo = () => {
  const instructions = `
    $ node robot.js help   # Show game instructions
    $ node robot.js Place  # Place the robot on the board
    $ node robot.js Move   # Move robot one step in direction its facing
    $ node robot.js Left   # Turn robot 90 degrees left from where its facing
    $ node robot.js Right  # Turn robot 90 degrees to the right of where its facing
    $ node robot.js Report # Display current robot position on board
    $ node robot.js NewGame # Ends the current game and clears old robot position data
    `
  console.log(instructions)
}

export const report = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }
  readRobotData()
  console.log(`Output:${robotPosition?.X},${robotPosition?.Y},${robotPosition?.F}`)
}

const readRobotData=()=>{
let data = fs.readFileSync(fileName);
robotPosition = JSON.parse(data);
}

export const place = (position: Position) => {

  if (fileExists() === false) {
    let createStream = fs.createWriteStream(fileName);
    createStream.end();
  }
  writePositionToFile(position)
}

const writePositionToFile = (position: Position) => {
  let data = JSON.stringify(position);
  fs.writeFileSync(fileName, data, { encoding: 'utf8', flag: 'w' });
}
export const move = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }

  readRobotData()

  if (robotPosition.F === Direction.North) {
    if (isValidMaxIndex(robotPosition.Y))
      robotPosition.Y = robotPosition.Y + 1
  }
  else if (robotPosition.F === Direction.South) {
    if (isValidMinIndex(robotPosition.Y))
      robotPosition.Y = robotPosition.Y - 1
  }
  else if (robotPosition.F === Direction.East) {
    if (isValidMaxIndex(robotPosition.X))
      robotPosition.X = robotPosition.X + 1
  }
  else if (robotPosition?.F === Direction.West) {
    if (isValidMinIndex(robotPosition.X))
      robotPosition.X = robotPosition.X - 1
  }

  writePositionToFile(robotPosition)
}

export const left = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }
  readRobotData()
  if (robotPosition.F === Direction.North)
    robotPosition.F = Direction.West
  else if (robotPosition?.F === Direction.South)
    robotPosition.F = Direction.East
  else if (robotPosition?.F === Direction.East)
    robotPosition.F = Direction.North
  else if (robotPosition?.F === Direction.West)
    robotPosition.F = Direction.South

    writePositionToFile(robotPosition)
}

export const right = () => {
  if (isRobotPlaced===false) {
    console.log(robotNotPlaceValidstionMessage)
    return
  }
  readRobotData()
  if (robotPosition.F === Direction.North)
    robotPosition.F = Direction.East
  else if (robotPosition.F === Direction.South)
    robotPosition.F = Direction.West
  else if (robotPosition.F === Direction.East)
    robotPosition.F = Direction.South
  else if (robotPosition.F === Direction.West)
    robotPosition.F = Direction.North

  writePositionToFile(robotPosition)
}

export const deleteGameData = () => {
  try {
    fs.unlinkSync(fileName)
  } catch (err) {
    console.error(err)
  }
}

const isValidMaxIndex = (index: number) => {
  return index < maxIndex ? true : false
}

const isValidMinIndex = (index: number) => {
  return index > minIndex ? true : false
}





