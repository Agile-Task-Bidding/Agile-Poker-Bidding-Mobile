import React from 'react';
import {
  TextInput, StyleSheet, View, Button, BackHandler,
  Text, TouchableOpacity, Alert, Keyboard,
  Dimensions, Platform, UIManager
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Checkbox} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import { styles } from '../styles/styles';
import {  BackArrow } from './Images';
import axios from 'axios';

export default function CreateCardScreen({ navigation }) {

  const [checked, setChecked] = React.useState(false);

  const [cardValues, setCardVals] = React.useState([])

  const handleAbstain = () =>{
    setChecked(!checked);
    console.log(checked);
    // const status = [...checked];
    if(checked === false){
        const newCards = [...cardValues, {"Value": "Abstain", "Tag":""}];
        setCardVals(newCards);
        console.log(cardValues);
    }
  }
  const backButtonPressed = () => {
    navigation.navigate("HomeScreen")
  }

  const addElement = () => {
    var newArray = [...cardValues, {}];
    setCardVals(newArray);

    //  cardFrame(cardValues);
  }

  //updates elements in the array
  const handleValue1 = (index, value) => {
    const newCards = [...cardValues];
    newCards[index] = {"Value": value, "Tag":newCards[index].Tag};
    setCardVals(newCards);
    console.log(cardValues);
  }

  //updates elements in the array
  const handleValue2 = (index, value) => {
    const newCards = [...cardValues];
    newCards[index] = {"Value": newCards[index].Value,"Tag": value};
    setCardVals(newCards);
    console.log(cardValues);
  }

  //deletes elements from the array
  const handleRemove = (value) => {
    console.log(value);
    const prevState = [...cardValues];
    const newCards = prevState.filter((item) => item.Value !== value);
    setCardVals(newCards);

    console.log(newCards);
  }

  const saveToDB = () => {
    // axios.put(`http://localhost:80/api/v1/users/${firebase.auth().currentUser.uid}/roomConfig`, { roomConfig: roomConfig }, {
    //     headers: {
    //       'Authorization': 'Bearer ' + (await firebase.auth().currentUser.getIdToken())
    //     }
    //   });
  }


  return (

    <View style={styles.mainBody}>
      <View style={stylesCard.duoBody}>
                    <TouchableOpacity onPress={() => backButtonPressed()}>
                        <BackArrow />
                    </TouchableOpacity>
      </View>
      <FlatGrid
        itemDimension={130}
        data={cardValues}
        style={stylesCard.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item , index}) => (
          <View style={[stylesCard.itemContainer, { backgroundColor: "#fff" }]}>
            <TextInput
              placeholder="Number"
            //   value={card}
              onChangeText={CardValue => handleValue1(index, CardValue)}
              value={item.Value}
              style={styles.textInputStyle}
              style={{fontSize:40, top:10}}
              textAlign={'center'}
              underlineColorAndroid='transparent'
            />
            <TextInput
              placeholder="Tag"

              onChangeText={CardTag=> handleValue2(index,CardTag)}
              value={item.Tag}
              style={styles.textInputStyle}
              style={{fontSize:20, top:15}}
              textAlign={'center'}
              underlineColorAndroid='transparent'
            />
            <View style={{position:'absolute',bottom:20, left:15, right:15}}>
             <Button 
              // Some properties given to Button 
              title="Delete"
              style = {stylesCard.deleteButton}
              onPress={() => handleRemove(item.Value)} 
            /> 
            </View>
          </View>
        )}
      />
      <View style={stylesCard.duoBody}>
        
        <View style={stylesCard.checkboxContainer}>
          <Checkbox
             status={checked ? 'checked' : 'unchecked'}
             onPress={() => {handleAbstain()}}
          />
         <Text style={stylesCard.label}>Allow Abstain</Text>
         <View style={styles.inlineTextHome}>
                <TouchableOpacity
                    style={styles.logoutButtonStyle}
                    activeOpacity={0.5}
                    //THIS: need to be fixed
                    onPress={()  => {saveToDB()}} >
                    <Text style={styles.logoutButtonTextStyle}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.logoutButtonStyle}
                    activeOpacity={0.5}
                    //THIS: need to be fixed
                    onPress={()  => navigation.navigate("RoomScreen",cardValues)} >
                    <Text style={styles.logoutButtonTextStyle}>Start</Text>
                </TouchableOpacity>
          </View>
        </View>
      </View>

      <ActionButton
        style={stylesCard.fab}
        buttonColor="#7FBAF7"
        onPress={() => {addElement()}}
     />
      {/* <ActionButton buttonColor="#7FBAF7" style={stylesCard.floatingButton}> */}
        {/* <ActionButton.Item buttonColor='#7FBAF7' title="Add Card" onPress={addElement}>
          <Icon name="md-create" style={stylesCard.optionfloatingButton} />
        </ActionButton.Item> */}
      {/* </ActionButton> */}
      
    </View>

  );
}

const stylesCard = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    color: "#ffffff",
  },
  label: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 15,
  },
  itemContainer: {
    borderRadius: 5,
    // padding: 5,
    flex:2,
    height: 300,
    borderColor: "#2B84ED",
    borderWidth: 2,
  },
  fab: {
    position: 'absolute',
    margin: -10,
    right: 0,
    bottom: 40,
  },
  deleteButton:{
    position: 'absolute',
  },
  startButton:{
    position: 'absolute',
    width: 10,
    justifyContent: "center",
    // position: 'absolute',
    
  },
  duoBody: {
    flex: .09,
    justifyContent: 'flex-start',
    backgroundColor: "#2B84ED",
    borderBottomColor: 'black',
    borderBottomWidth: .5,
  },

});

