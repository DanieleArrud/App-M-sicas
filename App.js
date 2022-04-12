import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, YellowBox, LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Play from './player.js';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [ audioIndex , setarAudioIndex ] = useState(0);

  const [ playing, setPlaying ] = useState(false);

  const [audio, setarAudio] = useState(null);

  const [song, setarSong] = useState([

    {
      nome: "This love",
      artista: 'Marron 5',
      playing: false,
      file: require('./audio.mp3')
 
    },

    {
      nome: 'Clock',
      artista: 'Coldplay',
      playing: false,
      file:{uri: 'https://soundcloud.com/grabbitz/another-form-of-goodbye-2?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'}
    },

    {
      nome: 'Welcome Home',
      artista: 'Radical Face',
      playing: false,
      file: ''
    },

    {
      nome: "This love",
      artista: 'Marron 5',
      playing: false,
      file: require('./audio.mp3')
 
    },

    {
      nome: 'Clock',
      artista: 'Coldplay',
      playing: false,
      file:''
    },

    {
      nome: 'Welcome Home',
      artista: 'Radical Face',
      playing: false,
      file: ''
    },

    {
      nome: "This love",
      artista: 'Marron 5',
      playing: false,
      file: require('./audio.mp3')
 
    },

    {
      nome: 'Clock',
      artista: 'Coldplay',
      playing: false,
      file:''
    },

    {
      nome: 'Welcome Home',
      artista: 'Radical Face',
      playing: false,
      file: ''
    },

    {
      nome: "This love",
      artista: 'Marron 5',
      playing: false,
      file: require('./audio.mp3')
 
    },

    {
      nome: 'Clock',
      artista: 'Coldplay',
      playing: false,
      file:''
    },

    {
      nome: 'Welcome Home',
      artista: 'Radical Face',
      playing: false,
      file: ''
    }  
  ]);

  const changeSong = async (id) => {
    let curfile = null;
    let newSong = song.filter((val, k) => {
      if(id == k){
        song[k].playing = true;
        curfile = song[k].file;

        setPlaying(true);
        setarAudioIndex(id);
      }
      else{
        song[k].playing = false;
      }

      return song[k];
    })

    if(audio != null){
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try{
      await curAudio.loadAsync(curfile);
      await curAudio.playAsync();
    }catch(error){}

    setarAudio(curAudio);
    setarSong(newSong);
    
  }

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}> 
        <StatusBar hidden/>

        <View style={styles.header}>
          <Text style={{fontSize: 32, color: 'white'}}> App Music</Text>
        </View>
        
        <View style={styles.table}> 
          <Text style={{width: '50%', color: 'rgb(200,200,200)'}}>Song</Text>
          <Text style={{width: '50%', color: 'rgb(200,200,200)'}}>Artista</Text>
        </View>

        {
          song.map((val, k) => {

            if(val.playing){
              //renderiza
              return(
              <View style={styles.table}>
                <TouchableOpacity onPress={()=>changeSong(k)} style={{width:'100%', flexDirection: 'row'}}>
                  <Text style={styles.tableText}>
                    <AntDesign name="play" size={20} color="#1BD954" />
                      {val.nome}
                  </Text>
                  <Text style={styles.tableText}>{val.artista}</Text>
                </TouchableOpacity>
              </View>
              );

            } else{
              //renderiza outra
              return(
                <View style={styles.table}>
                <TouchableOpacity onPress={()=>changeSong(k)} style={{width:'100%', flexDirection: 'row'}}>
                  <Text style={{width: '50%', color: 'white'}}>
                    <AntDesign name="play" size={20} color="white" />
                      {val.nome}
                    </Text>
                  <Text style={{width: '50%', color: 'white'}}>{val.artista}</Text>
                </TouchableOpacity>
              </View>
                );
            }
          })
        }
      
          <View style={{paddingBottom:200}}></View>

      </ScrollView>

      <Play playing={playing} setPlaying={setPlaying} audio={audio} setarAudio={setarAudio} audioIndex={audioIndex}
      setarAudioIndex={setarAudioIndex} setarSong={setarSong} song={song}></Play>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#1BD954',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  table:{
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  tableText: {
    width: '50%', 
    color: '#1BD954',
  }
});
