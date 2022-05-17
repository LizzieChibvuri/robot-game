
export interface Position {
    X: number
    Y: number
    F: Direction
  }

  export enum Direction {
    North = 'North',
    South = 'South',
    East = 'East',
    West = 'West'
  }