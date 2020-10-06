// Import-Anweisungen
import React, { Component } from "react";
import { Button, StyleSheet, View, Platform, SafeAreaView } from "react-native";
// APIs und Komponenten
// eigene Komponenten
import Quote from "./js/components/Quote";
import NewQuote from "./js/components/NewQuote";

const data = [
  {
    text:
      "Probleme kann man niemals mit derselben Denkweise lösen, durch die sie entstanden sind.",
    author: "Albert Einstein",
  },
  {
    text:
      "Man braucht nichts im Leben zu fürchten. man muss nur alles verstehen",
    author: "Marie Curie",
  },
  { text: "Nichts ist so beständig wie der Wandel", author: "Heraklit" },
];

// Deklaration einer Komponente (hier als Klasse)
export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: data }; // Initialer Zustand

  _addQuote = (text, author) => {
    // aktuelle Liste der Zitate einer Variablen zu
    let { quotes } = this.state;
    // Füge neue Zitate an das Ende der Liste an
    if (text && author) {
      quotes.push({ text, author });
    }
    // Aktualisiere Liste der Zitate im State
    this.setState({ showNewQuoteScreen: false, quotes: quotes });
  };

  // render: Darstellung der Komponente im UI
  // render wird automatisch ausgeführt:
  // a) Komponente erscheint im UI (initialer Zustand in state)
  // b) Zustand änder sich (state) ==> this.setState(...)
  // c) wenn props sich ändern
  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let nextIndex = index + 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.newButton}>
          <Button
            title="+"
            onPress={() => this.setState({ showNewQuoteScreen: true })}
          />
        </View>
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        <Quote text={quote.text} author={quote.author} />
        <View style={styles.nextButton}>
          <Button
            title="Nächstes Zitat"
            onPress={() => this.setState({ index: nextIndex })}
          />
        </View>
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
});
