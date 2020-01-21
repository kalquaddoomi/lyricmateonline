import React, { Component } from 'react';
import {Text, View, Alert, ScrollView, StyleSheet} from 'react-native';

import SongButton from "../components/songbutton";

class SongList extends Component {
    constructor(props) {
        super(props);
    }
    songSelectCallback(song, listposition) {
        this.props.songSelected(song, listposition)
    }
    render() {
        let { songlist } = this.props;
        songlist.sort((a, b) => (a.title > b.title) ? 1 : -1);
        songlist.filter((song) => {if(song.tags != null) {
            return !song.tags.includes('disabled')
        }});
        console.log(songlist);
        return(
            <ScrollView style={styles.songContainer}>
                {songlist.map((song, index) => {
                        return (
                            <SongButton key={song.id} song={song} listposition={index} pressCallback={this.songSelectCallback.bind(this)}/>
                        )
                    }
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    songContainer: {

    },
});

export default SongList;