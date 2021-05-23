import {Alert, Platform} from 'react-native';
import {deleteDataByKey, setDataByKey} from './localStorage';
import {getCommentsStorageKey, resetComments} from './reducers/commentsReducer';
import {
  getShoutsStorageKey,
  loadShouts,
  resetShoutPoints,
} from './reducers/shoutsReducer';
import {setUser} from './reducers/userReducer';
import mockUsers from '../static/mockUsers';
import {store} from './store';

const title = 'Test menu';
const message = `Type the number of the command you wish to execute

  1. Reset user shout points to 15
  2. Clear all comments
  3. Clear all shouts and comments
  4. Clear all comments by user
  5. Clear all shouts and comments by user
  6. Use user 1 (default)
  7. Use user 2
  8. Use user 3
`;

export default {
  launch: async () => {
    // Execute commands 1. and 3. on Android
    if (Platform.OS === 'android') {
      const state = store.getState();
      const userId = state.user.value.id;
      const shouts = store.getState().shouts.value;
      for (let shout of shouts) {
        await deleteDataByKey(getCommentsStorageKey(shout.id));
      }
      await deleteDataByKey(getShoutsStorageKey());
      store.dispatch(resetComments());
      store.dispatch(loadShouts([]));
      store.dispatch(resetShoutPoints(userId));
      return;
    }

    Alert.prompt(title, message, async text => {
      const commandId = parseInt(text);
      const state = store.getState();
      const userId = state.user.value.id;
      const shouts = store.getState().shouts.value;

      if (commandId === 1) {
        store.dispatch(resetShoutPoints(userId));
      }
      if (commandId === 2 || commandId === 3) {
        for (let shout of shouts) {
          await deleteDataByKey(getCommentsStorageKey(shout.id));
        }
        store.dispatch(resetComments());
      }
      if (commandId === 3) {
        await deleteDataByKey(getShoutsStorageKey());
        store.dispatch(loadShouts([]));
      }
      if (commandId === 4 || commandId === 5) {
        for (let shout of shouts) {
          if (shout.authorId === userId) {
            await deleteDataByKey(getCommentsStorageKey(shout.id));
          }
        }
        store.dispatch(resetComments());
      }
      if (commandId === 5) {
        const filteredShouts = shouts.filter(s => s.authorId !== userId);
        await setDataByKey(getShoutsStorageKey(), filteredShouts);
        store.dispatch(loadShouts([]));
      }
      if ([6, 7, 8].includes(commandId)) {
        store.dispatch(setUser(mockUsers[commandId - 6]));
      }
    });
  },
};
