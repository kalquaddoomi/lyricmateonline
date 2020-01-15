import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from "react-native";
import SongList from "./pages/songlist";

class Lyricmate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSongId: null
        }
    }
    songSelectionChange(songId) {
        this.setState({currentSongId: songId})
    }

    render() {
        let output = '';
        if(this.state.currentSongId === null) {
            output = <View>
                <Text style={styles.introLine}>Pair ~ A ~ Dice Tumblers</Text>
                <Text style={styles.headLine}>Lyric Mate Song List</Text>
                <SongList
                    songlist={[{id: 1, title: "The Saints"}, {id: 2, title: "Ain't my Fault"}]}
                    songSelected={this.songSelectionChange.bind(this)}
                />
            </View>
        } else {
            output = <View>
                <Button
                title={"Back to Song List"}
                onPress={() => this.setState({currentSongId: null})}
                    />
                <Text style={styles.headLine}>Lyrics for Song #{this.state.currentSongId}</Text>

            </View>
        }
            return (
                <View style={styles.container}>
                    {output}
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headLine: {
        fontSize: 30,
    },
    introLine: {
        fontSize: 18,
    },
});

export default Lyricmate;