import { ImageSourcePropType, StyleProp, TextStyle } from "react-native"
import { ShoutFrames } from "../images";

export type ShoutFrame = {
  source: ImageSourcePropType,
  textStyle?: StyleProp<TextStyle>
}

const shoutFrames: ShoutFrame[] = [
  {
    source: ShoutFrames[0],
    textStyle: {
      marginLeft: 55,
      marginRight: 20,
      marginTop: 15
    }
  },
  {
    source: ShoutFrames[1],
    textStyle: {
      marginLeft: 50,
      marginRight: 50,
      marginTop: 15
    }
  },
  {
    source: ShoutFrames[2],
    textStyle: {
      color: "red",
      marginLeft: 50,
      marginRight: 50,
      marginTop: 5
    }
  },
  {
    source: ShoutFrames[3],
    textStyle: {
      marginLeft: 60,
      marginRight: 30,
      marginTop: 20
    }
  },
  {
    source: ShoutFrames[4],
    textStyle: {
      marginLeft: 60,
      marginRight: 20,
      marginTop: 12
    }
  },
  {
    source: ShoutFrames[5],
    textStyle: {
      marginLeft: 60,
      marginRight: 25,
      marginTop: 20
    }
  },
  {
    source: ShoutFrames[6],
    textStyle: {
      marginLeft: 60,
      marginRight: 30,
      marginTop: 20
    }
  },
  {
    source: ShoutFrames[7],
    textStyle: {
      marginLeft: 70,
      marginRight: 15,
      marginTop: 25
    }
  },
  {
    source: ShoutFrames[8],
    textStyle: {
      marginLeft: 60,
      marginRight: 30,
      marginTop: 20
    }
  },
  {
    source: ShoutFrames[9],
    textStyle: {
      marginLeft: 55,
      marginRight: 20,
      marginTop: 20
    }
  },
  {
    source: ShoutFrames[10],
    textStyle: {
      marginLeft: 60,
      marginRight: 45,
      marginTop: 20
    }
  },
]

export default shoutFrames;
