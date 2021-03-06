import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Image,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONFIG from '../../../config';
import {
  useAppDispatch,
  useAppSelector,
  selectComments,
  addShoutComment,
  loadShoutComments,
  resetComments,
  selectUser,
} from '../../../state';
import {Buttons} from '../../../images';
import {formatCommentTimestamp} from '../../../utils';

import ImageButton from '../../core/ImageButton';
import LightBlurView from '../../core/LightBlurView';

type Props = {
  onClose: () => void;
  shoutId: number;
};

export default ({onClose, shoutId}: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const comments = useAppSelector(selectComments);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(loadShoutComments(shoutId));

    return () => {
      dispatch(resetComments());
    };
  }, [shoutId]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LightBlurView />
      <View style={styles.commentsList}>
        <View style={styles.commentsContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mapPreview} />
          </TouchableWithoutFeedback>
          <View style={styles.commentsListSection}>
            <View style={styles.topBar}>
              <ImageButton
                style={styles.closeButton}
                source={Buttons.ButtonX}
                aspectRatio={0.25}
                onPress={onClose}
              />
            </View>
            <ScrollView style={styles.commentsList} scrollEnabled={true}>
              {comments.map(c => (
                <View key={c.id} style={styles.commentItem}>
                  <View style={styles.commentItemLeft}>
                    <View style={styles.messageIcon}>
                      <Image
                        source={{uri: c.authorAvatarUrl}}
                        style={styles.messageAuthorAvatar}
                      />
                    </View>
                    <Text>{formatCommentTimestamp(c.timestamp)}</Text>
                  </View>
                  <Text style={styles.commentItemRight}>{c.text}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.messageBar}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder={'Type a message here'}
                placeholderTextColor="white"
                style={styles.textBar}
                maxLength={CONFIG.MAX_COMMENT_LENGTH}
                multiline
              />
              <Icon
                name="smile-o"
                size={35}
                color="#FFF"
                onPress={() => Alert.alert('Not implemented.')}
              />
              <Icon
                name="paper-plane"
                size={35}
                color="#FFF"
                style={styles.messageIcon}
                onPress={() => {
                  if (!commentText) {
                    return;
                  }
                  const now = Date.now();
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                  dispatch(
                    addShoutComment({
                      id: now,
                      shoutId: shoutId!,
                      authorId: user.id,
                      authorAvatarUrl: user.avatarUrl,
                      timestamp: now,
                      text: commentText,
                    }),
                  );
                  setCommentText('');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  commentsContainer: {
    flex: 1,
  },
  mapPreview: {
    flex: 1,
  },
  topBar: {
    height: 25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  closeButton: {
    marginRight: 20,
  },
  commentItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentItemLeft: {
    marginLeft: 10,
    alignItems: 'center',
  },
  commentItemRight: {
    backgroundColor: 'black',
    color: 'white',
    margin: 10,
    flexGrow: 1,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  commentsList: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexGrow: 4,
  },
  messageBar: {
    flex: 1,
    height: 25,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 30,
    backgroundColor: 'black',
  },
  messageIcon: {
    margin: 10,
  },
  messageAuthorAvatar: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    flex: 1,
  },
  textBar: {
    flexGrow: 1,
    fontSize: 16,
    color: 'white',
    marginHorizontal: 10,
  },
  commentsListSection: {
    flex: 1,
    flexGrow: 1.5,
  },
});
