import React, { Component} from 'react';
import {Text, Button, View, Alert, StyleSheet, Dimensions} from 'react-native';

class SongButton extends Component {
    render() {
        const {width, height} = Dimensions.get('window');
        const buttonWidth = width / 1.2;
        return(
            <View style={[styles.songButton, {width: buttonWidth}]} key={this.props.listposition}>
            <Button
                color={"white"}
                title={this.props.song.title}
                onPress={() => this.props.pressCallback(this.props.song, this.props.listposition)}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    songButton: {
        borderColor: 'black',
        height: 40,
        borderWidth: 1,
        backgroundColor: '#8888ff',
        marginTop:5,
    }
});

export default SongButton;
