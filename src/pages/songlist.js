import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
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
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                {this.props.songlist.map((song) => {
                        return (
                            <SongButton key={song.id} song={song} pressCallback={this.songSelectCallback.bind(this)}/>
                        )
                    }
                )}
            </View>
        )
    }
}

export default SongList;