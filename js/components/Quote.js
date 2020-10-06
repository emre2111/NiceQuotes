import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Quote(props) {
  const { text, author } = props; // destructuring
  // const text = this.props.text
  // const author = this.props.author
  return (
    <View style={styles.component}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author}</Text>
    </View>
  );
}

// Styling in React Native mit JavaScript
const styles = StyleSheet.create({
  component: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 4,
    elevation: 2,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 0.75,
    },
    shadowRadius: 1.5,
  },
  text: {
    fontSize: 36,
    fontStyle: "italic",
    marginBottom: 10,
  },
  author: {
    fontSize: 20,
    textAlign: "right",
  },
});
