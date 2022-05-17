import { Direction } from "./models/Position.interface";
import * as RobotHandler from "./RobotHandler";

const args=process.argv

switch(args[2]){
    case 'help':{
        RobotHandler.getRobotGameInfo()
        break;
    }

    case 'Place':{
        var newPosition=args[3].split(',')
        
        if(newPosition.length===3){
            const X:number=Number(newPosition[0])
            const Y:number=Number(newPosition[1])
            const F: Direction = Direction[newPosition[2] as keyof typeof Direction];
            RobotHandler.place({X,Y,F})
        }else{

            console.log("Invalid move,please try again")
        }
        break;
    }

    case 'Move':{
        RobotHandler.move()
        break;
    }

    case 'Left':{
        RobotHandler.left()
        break;
    }

    case 'Right':{
        RobotHandler.right()
        break;
    }

    case 'Report':{
        RobotHandler.report()
        break;
    }

    case 'GameOver':{
        RobotHandler.deleteRobotDataFile()
        break;
    }

    default:{
        console.log("Invalid input ,please see use help command for options")
    }

}
