import {ImageSourcePropType, StyleProp, TextStyle} from 'react-native';
import {ShoutFrames} from '../images';

export type ShoutFrame = {
  id: number;
  source: ImageSourcePropType;
  textStyle?: StyleProp<TextStyle>;
};

const shoutFrames: ShoutFrame[] = [
  {
    id: 0,
    source: ShoutFrames[0],
    textStyle: {
      marginLeft: 55,
      marginRight: 20,
      marginTop: 15,
    },
  },
  {
    id: 1,
    source: ShoutFrames[1],
    textStyle: {
      marginLeft: 50,
      marginRight: 50,
      marginTop: 15,
    },
  },
  {
    id: 2,
    source: ShoutFrames[2],
    textStyle: {
      color: 'red',
      marginLeft: 50,
      marginRight: 50,
      marginTop: 5,
    },
  },
  {
    id: 3,
    source: ShoutFrames[3],
    textStyle: {
      marginLeft: 60,
      marginRight: 30,
      marginTop: 20,
    },
  },
  {
    id: 4,
    source: ShoutFrames[4],
    textStyle: {
      marginLeft: 60,
      marginRight: 20,
      marginTop: 12,
    },
  },
  {
    id: 5,
    source: ShoutFrames[5],
    textStyle: {
      marginLeft: 60,
      marginRight: 25,
      marginTop: 20,
    },
  },
  {
    id: 6,
    source: ShoutFrames[6],
    textStyle: {
      marginLeft: 60,
      marginRight: 30,
      marginTop: 20,
    },
  },
  {
    id: 7,
    source: ShoutFrames[7],
    textStyle: {
      marginLeft: 70,
      marginRight: 15,
      marginTop: 25,
    },
  },
  {
    id: 8,
    source: ShoutFrames[8],
    textStyle: {
      marginLeft: 60,
      marginRight: 30,
      marginTop: 20,
    },
  },
  {
    id: 9,
    source: ShoutFrames[9],
    textStyle: {
      marginLeft: 55,
      marginRight: 20,
      marginTop: 20,
    },
  },
  {
    id: 10,
    source: ShoutFrames[10],
    textStyle: {
      marginLeft: 60,
      marginRight: 45,
      marginTop: 20,
    },
  },
];

export default shoutFrames;
