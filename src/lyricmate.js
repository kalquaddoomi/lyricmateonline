import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Dimensions, SafeAreaView, Alert} from "react-native";

import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

import SongList from "./pages/songlist";
import Lyrics from "./pages/lyrics"


const songs = [
    {id: 1, title: "The Saints"},
    {id: 2, title: "Ain't my Fault"}
    ]
class Lyricmate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSongId: null,
            songs: []
        }
    }
    songSelectionChange(songId) {
        this.setState({currentSongId: songId})
    }

    downloadSonglist() {
        console.log("Downloading the Song List")
        const fileName = FileSystem.documentDirectory + "songlist2.json";
        FileSystem.downloadAsync("http://localhost:3000/api/songlist", fileName).then((value) => {
            Alert.alert("Download Complete!");
            this.readSongList();
        }).catch((reason) => {
            Alert.alert(`Sorry, there was a problem. Please try again later. DEBUG: ${reason}`)
        })
    }

    readSongList() {
        const fileName = FileSystem.documentDirectory + "songlist2.json";
        FileSystem.readAsStringAsync(fileName).then((value) => {
            this.setState({songs: JSON.parse(value)})
        }).catch((reason) => {
            Alert.alert("Failed to load Song List, please try downloading the list using 'Download' button")
        })
    }

    componentDidMount() {
        this.readSongList()
    }

    render() {

        let output = '';
        if(this.state.currentSongId === null) {
            output = <View>
                <Button onPress={() => this.downloadSonglist()} title={"Download the Song List"}/>
                <Text style={styles.introLine}>Pair ~ A ~ Dice Tumblers</Text>
                <Text style={styles.headLine}>Lyric Mate Song List</Text>
                <SongList
                    songlist={this.state.songs}
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
                <SafeAreaView style={styles.container}>
                    {output}
                </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 80,
    },
    headLine: {
        fontSize: 30,
    },
    introLine: {
        fontSize: 18,
    },
});

export default Lyricmate;