import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Dimensions, SafeAreaView, Alert, BackHandler} from "react-native";

import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

import SongList from "./pages/songlist";
import Lyrics from "./pages/lyrics"


const lyricSizes = {
    mini: {name: "Mini", size: 12, bigger: "small", smaller: "none"},
    small: {name: "Small", size: 16, bigger: "medium", smaller: "mini"},
    medium: {name: "Medium", size: 20, bigger: "large", smaller: "small"},
    large: {name: "Large", size: 28, bigger: "xlarge", smaller: "medium"},
    xlarge: {name: "X-Large", size: 36, bigger: "none", smaller: "large"}
};



class Lyricmate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: null,
            listPosition: 0,
            songs: [],
            fontSize: lyricSizes.xlarge,
            downloadURI: "https://lyric-manager.herokuapp.com/api/songlist",
            error: ""
        }
    }

    songSelectionChange(song, listposition) {
        this.setState({currentSong: song, listPosition: listposition})
    }

    fontSizeChange(new_size, initialLoad = false) {
        let newSize = this.state.fontSize;
        switch(new_size) {
            case 'mini':
                newSize = lyricSizes.mini;
                break;
            case 'small':
                newSize = lyricSizes.small;
                break;
            case 'medium':
                newSize = lyricSizes.medium;
                break;
            case 'large':
                newSize = lyricSizes.large;
                break;
            case 'xlarge':
                newSize = lyricSizes.xlarge;
                break;
            default:
                break;
        }
        this.writeSettingsFile(newSize);
        this.setState({fontSize: newSize});
    }

    writeSettingsFile(size) {
        const fileName = FileSystem.documentDirectory + "settings.json";
        FileSystem.writeAsStringAsync(fileName, JSON.stringify(size));
    }

    readSettingsFile() {
        const fileName = FileSystem.documentDirectory + "settings.json";
        FileSystem.readAsStringAsync(fileName).then((result) => {
            const newSize = JSON.parse(result);
            this.setState({fontSize: newSize});
        }).catch((reason) => {
            if(reason.includes('ENOENT')) {
                this.writeSettingsFile(lyricSizes.medium);
            }
        })

    }

    downloadSonglist() {
        const fileName = FileSystem.documentDirectory + "songlist2.json";
        FileSystem.downloadAsync(this.state.downloadURI, fileName).then((value) => {
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
                Alert.alert(`${reason}`)
                this.setState({error:`There was a problem: ${reason}`})
        })
    }

    handleBackPress() {
        if(this.state.currentSong != null) {
            this.setState({currentSong: null});
            return true;
        } else {
            return true;
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
        this.readSongList();
        this.readSettingsFile();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }


    render() {
        let output = '';
        let error = null;
        if(this.state.error.length > 0) {
             error = <View>
                <Text>{this.state.error}</Text>
            </View>
        }
        if(this.state.currentSong === null) {
            output = <View>
                <Button onPress={() => this.downloadSonglist()} title={"Download the Song List"}/>
                <Text style={styles.introLine}>Pair ~ A ~ Dice Tumblers</Text>
                <Text style={styles.headLine}>Lyric Mate Song List</Text>
                <SongList
                    songlist={this.state.songs}
                    songSelected={this.songSelectionChange.bind(this)}
                    listPosition={this.state.listPosition}
                />
            </View>
        } else {
            output = <View>
                <View style={{marginBottom: 10}}>
                <Button
                title={"Back to Song List"}
                onPress={() => this.setState({currentSong: null})}
                    />
                </View>

                <Lyrics song={this.state.currentSong} lyricSize={this.state.fontSize} changeSize={this.fontSizeChange.bind(this)}/>

            </View>
        }
            return (
                <SafeAreaView style={styles.container}>
                    {error}
                    {output}
                </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight + 10,
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