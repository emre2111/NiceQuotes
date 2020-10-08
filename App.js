// Import-Anweisungen
import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
// APIs und Komponenten
// eigene Komponenten
import Quote from "./js/components/Quote";
import NewQuote from "./js/components/NewQuote";
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("quotes.db");

function StyledButton(props) {
  let button = null;
  if (props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    );
  return button;
}

// Deklaration einer Komponente (hier als Klasse)
export default class App extends Component {
  // Initialer Zustand
  state = {
    index: 0,
    showNewQuoteScreen: false,
    quotes: [],
  };

  _retrieveData() {
    database.transaction((transaction) =>
      transaction.executeSql("SELECT * FROM quotes", [], (_, result) =>
        this.setState({ quotes: result.rows._array })
      )
    );
  }

  _saveQuoteToDB(text, author) {
    // INSERT into quotes
    database.transaction((transaction) =>
      transaction.executeSql(
        "INSERT INTO quotes (text, author) VALUES (?,?)",
        [text, author],
        (_, result) => (quotes[quotes.length - 1].id = result.insertId)
      )
    );
  }

  _removeQuoteFromDB() {
    database.transaction((transaction) =>
      transaction.executeSql("DELETE FROM quotes WHERE id = ?", [id])
    );
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._saveQuoteToDB(text, author, quotes);
    }
    this.setState({
      index: quotes.length - 1,
      showNewQuoteScreen: false,
      quotes,
    });
  };

  _deleteButton() {
    Alert.alert(
      "Zitate löschen?",
      "Dies kann nicht rückgängig gemacht werden.",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => this._deleteQuote(),
        },
      ]
    );
  }

  _deleteQuote() {
    let { index, quotes } = this.state;
    //Lösche das Zitat aus dem Array
    quotes.splice(index, 1);
    // aus dem Speicher löschen
    this._removeQuoteFromDB(quotes[index].id);
    //Angezeigt Liste aktualisieren und bei 0 anfangen
    this.setState({ index: 0, quotes });
  }

  _displayNextQuote() {
    let { index, quotes } = this.state;
    let nextIndex = index + 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    this.setState({ index: nextIndex });
  }

  componentDidMount() {
    database.transaction((transaction) =>
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY NOT NULL, text TEXT, author AUTHOR)"
      )
    );
    this._retrieveData();
  }

  // render: Darstellung der Komponente im UI
  // render wird automatisch ausgeführt:
  // a) Komponente erscheint im UI (initialer Zustand in state)
  // b) Zustand änder sich (state) ==> this.setState(...)
  // c) wenn props sich ändern
  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let content = <Text> Kein Zitat</Text>;
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <StyledButton
          style={styles.deleteButton}
          visible={quotes.length >= 1}
          title="Löschen"
          onPress={() => this._deleteButton()}
        />
        <StyledButton
          style={styles.newButton}
          visible={true}
          title="+"
          onPress={() => this.setState({ showNewQuoteScreen: true })}
        />
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        {content}
        <StyledButton
          style={styles.nextButton}
          visible={quotes.length >= 2}
          title="Nachstes Zitat"
          onPress={() => this._displayNextQuote()}
        />
      </SafeAreaView>
    );
  }
}

//Styles für Aussehen und Layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    position: "absolute",
    bottom: 10,
    bottom: Platform.OS === "ios" ? 20 : 0,
  },
  newButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  deleteButton: {
    position: "absolute",
    left: 10,
    top: 10,
  },
});
