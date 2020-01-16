import React, { Component } from 'react';
import {Text, View, Alert, ScrollView, StyleSheet} from 'react-native';

import SongButton from "../components/songbutton";

class SongList extends Component {
    constructor(props) {
        super(props);
    }
    songSelectCallback(songId) {
        this.props.songSelected(songId)
    }
    render() {
        return(
            <ScrollView style={styles.songContainer}>
                <View>
                {this.props.songlist.map((song) => {
                        return (
                            <SongButton key={song.id} song={song} pressCallback={this.songSelectCallback.bind(this)}/>
                        )
                    }
                )}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    songContainer: {

    },
});

export default SongList;