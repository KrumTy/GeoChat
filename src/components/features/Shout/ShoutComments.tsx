import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import Icon from 'react-native-vector-icons/FontAwesome';

import { useAppDispatch, useAppSelector } from "../../../state";
import { selectShoutPoints } from "../../../state/reducers/shoutsSlice";
import ImageButton from "../../core/ImageButton";
import { Buttons } from "../../../images";
import { selectSelectedShoutId, selectComments, addShoutComment } from "../../../state/reducers/commentsReducer";
import { selectUser } from "../../../state/reducers/userSlice";
const  { ButtonX } = Buttons;

type Props = {
  onClose: () => void;
}

export default ({ onClose }: Props) => {
  const [commentText, setCommentText] = useState("");
  const user = useAppSelector(selectUser);
  const selectedShoutId = useAppSelector(selectSelectedShoutId);
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();

  // if (comments.length > 1)
  // Alert.alert(JSON.stringify(comments));
  const comments2 = [{
    id: 0,
    text: "text"
  }, {
    id: 1,
    text: "longer text"
  }]

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.commentsList}>
        <View style={styles.commentsContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.mapPreview} />
          </TouchableWithoutFeedback>
          <View style={styles.commentsListSection}>
            <View style={styles.topBar}>
              <ImageButton 
                style={styles.closeButton}
                source={ButtonX} 
                aspectRatio={0.25}
                onPress={onClose} 
              />
            </View>

            <ScrollView style={styles.commentsList} scrollEnabled={true} >
              {comments.map(c => (
                <View key={c.id} style={styles.commentItem}>
                  <View style={styles.commentItemLeft}>
                    <Icon name="smile-o" size={35} color="#000" style={styles.messageIcon} />
                    <Text>16:00</Text>
                  </View>
                  <Text style={styles.commentItemRight}>{c.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.messageBar}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder={"Type a message here"} 
                placeholderTextColor="white" 
                style={styles.textBar}
                multiline
              />
              <Icon name="smile-o" size={35} color="#FFF" style={styles.messageIcon} 
                onPress={() => Alert.alert("Not implemented.")}
              />
              <Icon name="paper-plane" size={35} color="#FFF" style={styles.messageIcon} 
                onPress={() => {
                  const now = Date.now();
                  dispatch(addShoutComment({
                    id: now,
                    shoutId: selectedShoutId!,
                    authorId: user.id,
                    timestamp: now,
                    text: commentText
                  }));
                  setCommentText("");
                }
              }/>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  commentsContainer: {
    flex: 1,
  },
  mapPreview: {
    flex: 1
  },
  topBar: {
    height: 25,
    alignItems:"flex-end",
    justifyContent: "center",
    backgroundColor: "black"
  },
  closeButton: {
    marginRight: 20
  },
  commentItem: {
    flex: 1,
    flexDirection: "row",
  },
  commentItemLeft: {
    alignItems: "center",
  },
  commentItemRight: {
    backgroundColor: "black",
    color: "white",
    margin: 10,
    flexGrow: 1,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden"
  },
  commentsList: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexGrow: 4,
  },
  messageBar: {
    // paddingBottom: 20,
    flex: 1,
    height: 25,
    color: "white",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: 30,
    backgroundColor: "black"
  },
  messageIcon: {
    margin: 10
  },
  textBar: {
    flexGrow: 1,
    fontSize: 16,
    color: "white",
    marginHorizontal: 10,
  },
  commentsListSection: {
    flex: 1
  },
  text: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 30
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});
