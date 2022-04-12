import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInputComponent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Play(props) {

    //BOTAO VOLTAR
    const handBack = async()=>{
        let newIndex = props.audioIndex - 1;
        if(newIndex < 0){
            newIndex = props.song.legth - 1;

        }
        props.setarAudioIndex(newIndex);

        //atualiza a interface do app.
        let curfile = props.song[props.audioIndex].file;

        let newSong = props.song.filter((val, k) => {
            if(newIndex == k){
              props.song[k].playing = true;

              curfile = props.song[k].file;
      
            }
            else{
              props.song[k].playing = false;
            }
      
            return props.song[k];
          })
              
            if(props.audio != null){
                props.setPlaying(true);
                props.setarSong(newSong);
                await props.audio.playAsync();
            }
                let curAudio = new Audio.Sound();
                try {
                    await curAudio.loadAsync(curfile);
                    await curAudio.playAsync();
                } catch (error) {}
                    //erro na reprodução

                props.setarAudioIndex(curAudio);
                props.setarSong(newSong);
                props.setPlaying(true);
            
    
    }

    //BOTÃO PRÓXIMO
    const handNext = async()=>{
        let newIndex = props.audioIndex + 1;
        if(newIndex >= props.song.length){
            newIndex = 0;
        }
        props.setarAudioIndex(newIndex);

        let curfile = props.song[newIndex].file;
        //Atualizar interface do app.
        let newSong = props.song.filter((val,k)=>{
            if(newIndex == k){
                props.song[k].playing = true;
               
                curfile = props.song[k].file;
                
            }
            else{
                props.song[k].playing = false;
            }

            return props.song[k];
      })

        if(props.audio != null){
            props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
           await curAudio.loadAsync(curfile);
            await curAudio.playAsync();
        }catch(error){}

        props.setarAudio(curAudio);
        props.setarSong(newSong);
        props.setPlaying(true);
    }

    //BOTÃO PLAY
    const handPlay = async()=>{
        let curfile = props.song[props.audioIndex].file;

        let newSong = props.song.filter((val, k) => {
            if(props.audioIndex == k){
              props.song[k].playing = true;
              curfile = props.song[k].file;
            }
            else{
              props.song[k].playing = false;
            }
      
            return props.song[k];
          })

          try {
            if(props.audio != null){
                props.setPlaying(true);
                props.setarSong(newSong);
                await props.audio.playAsync();
            }
            else{
                let curAudio = new Audio.Sound();
                try {
                    await curAudio.loadAsync(curfile);
                    await curAudio.playAsync();
                } catch (error) {
                    //erro na reprodução
                }

                props.setarAudio(curAudio);
                props.setarSong(newSong);
                props.setPlaying(true);
            }
          } catch (error) {}
    }

    //BOTAO PAUSAR
    const handPause = async()=>{
        if(props.audio != null){
           props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }

    return(
        <View style={styles.player}>
            
            <TouchableOpacity onPress={()=>handBack()} style={{marginRight:20, marginLeft: 20}}>
                <AntDesign name='banckward' size={35} color='white'/>
            </TouchableOpacity>

            {
            (!props.playing)
            ?
            <TouchableOpacity onPress={()=>handPlay()} style={{marginRight:20, marginLeft: 20}}>
                <AntDesign name='playcircleo' size={45} color='white'/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>handPause()} style={{marginRight:20, marginLeft: 20}}>
                <AntDesign name='pausecircleo' size={45} color='white'/>
            </TouchableOpacity>
            }

            <TouchableOpacity onPress={()=>handNext()} style={{marginRight:20, marginLeft: 20}}>
                <AntDesign name='forward' size={35} color='white'/>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
        height: 100,
        position: 'absolute',
        left: 0,
        bottom:0,
        zIndex: 999,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})