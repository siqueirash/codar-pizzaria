import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS } from '../../Theme/COLORS';
import { MaterialIcons } from '@expo/vector-icons'

import firebase from '../../Firebase/firebase';
import Loading from '../../components/Loading'

import { styles } from './styles';

export default function Signin({ navigation }){

    const [visible, setVisible] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loadingLogin = () => {
        setVisible(true)
      }


    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(( userCredential) => {
        var user = userCredential.user;
        loadingLogin()
        navigation.navigate("Home", { idUser: user.uid})
        })
        .catch((error) => {
        // setError(true)
        const errorCode = error.code;
        const errorMessage = error.message;
        })

    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          if(user) {
            navigation.navigate("Home", { idUser: user.uid})
          } else {
            // navigation.navigate("WellCome")
          }
        });
    
      }, [])

  return (
    <View style={styles.container}>
         <Loading visible={visible}/>
        <View style={styles.containerTitle}>
            <TouchableOpacity onPress={() => navigation.navigate("WellCome")} style={styles.arrow}>
                <MaterialIcons name="arrow-back-ios" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>EFETUAR LOGIN</Text>
        </View>
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={COLORS.textColor}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={COLORS.textColor}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={{ marginBottom: 30, width: '90%'}}>
                <Text style={{color: COLORS.black, textAlign: 'right'}}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
            {email === "" || password === "" || password.length < 6
                ?
            <TouchableOpacity 
            style={[styles.button, { opacity: 0.7}]} onPress={() => navigation.navigate("Home")}
            disabled={true}
            >
                <Text style={styles.text}>Acessar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.button} onPress={() => loginFirebase()}>
                <Text style={styles.text}>Acessar</Text>
            </TouchableOpacity>

            }

            <View style={{ marginTop: '20%'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{color: COLORS.black, fontSize: 16}}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}