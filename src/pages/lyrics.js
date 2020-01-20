import React, { Component } from 'react';
import {Text, View, Alert, ScrollView, StyleSheet, SafeAreaView, Button, Dimensions} from 'react-native';

class Lyrics extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        let { lyricSize } = this.props;
        const {width, height} = Dimensions.get('window');
        const renderWidth = width * 0.9;
        return(
            <View style={{
                height: height,
                width: renderWidth,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center"}}>
                <View style={styles.fontSizeButtons}>
                    <Button
                        title={"Smaller"}
                        disabled={(lyricSize.smaller == "none")}
                        onPress={()=>{
                            this.props.changeSize(lyricSize.smaller)
                        }}
                    />
                    <Text>{lyricSize.name}</Text>
                    <Button
                        title={"Larger"}
                        disabled={(lyricSize.bigger == "none")}
                        onPress={()=>{
                            this.props.changeSize(lyricSize.bigger)
                        }}
                    />
                </View>
                <Text style={styles.lyricHeadLine}>{this.props.song.title}</Text>
                <ScrollView style={{marginBottom: 80}}>
                    <Text style={[styles.lyrics, {fontSize: this.props.lyricSize.size}]}>
                        {this.props.song.lyrics}
                    </Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lyricHeadLine : {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 20
    },
    lyrics: {
    },
    fontSizeButtons: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});


export default Lyrics;
