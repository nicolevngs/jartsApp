import React from 'react';
import { TextInput, Text, View, Image, ScrollView,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// import { chatStyles, colors } from './Styles';
import { getDataModel } from './DataModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { profileStyles, homeStyles } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';
import { detailsStyle, colors, chatStyles } from './Styles';

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.usersRef = firebase.firestore().collection('users');
        this.self = this.props.route.params.currentUser;
        console.log(" ");
        console.log("~~~~profile screen~~~~~");
        console.log("this.self on Profile Screen: ", this.self);
        this.savedPosts2 = []

        this.state = {
          savedPosts: []
        };
        this.asyncInit();
        console.log("this.state.savedPosts in constructor: ", this.state.savedPosts);
        
    }
    asyncInit = async () => {
      await this.loadSavedPosts(this.self.key);
    }

    loadSavedPosts = async (userKey) => {
      // this.usersRef = firebase.firestore().collection('users');
      let querySnap = await this.usersRef.doc(userKey).collection('savedPosts').get();
      querySnap.forEach(qDocSnap => {
        let key = qDocSnap.id;
        let data = qDocSnap.data();
        console.log("++++++++ data start+++++++++++");
        console.log("data in loadSavedPosts: ", data);
        console.log("--------- data end------------");
        data.key = key;
        this.state.savedPosts.push(data);
        this.savedPosts2.push(data);
      });
      this.setState({savedPosts: this.state.savedPosts})
      console.log("this.state.savedPosts in loadSavedPosts: ", this.state.savedPosts);
      console.log("this.savedPosts2 in loadSavedPosts: ", this.savedPosts2);
    }


    render() {
      return ( 
        <ScrollView >
         <View style={profileStyles.profileContainer}>
          <View style={profileStyles.topView}>
              <FontAwesome name="user-circle-o" 
                            size={70} 
                            color={'#F68444'} />
              <Text style={profileStyles.displayName}>{this.self.displayName}</Text>
              <TouchableOpacity style={profileStyles.myChatsButton}
                  onPress={()=>this.props.navigation.navigate('People', {currentUser: this.self})}>
                  <Text>My Chats</Text>  
              </TouchableOpacity>
          </View>
          <View style={profileStyles.bottomView}>
            <FlatList
                style={profileStyles.savedPostList}
                data={this.state.savedPosts}
                ref={(ref) => {this.flatListRef = ref}}
                renderItem={({item}) => {
                    console.log("?????????is this working??")
                    return (
                      // <View>
                      //     <Image style={homeStyles.image}source={{uri: item.imageURL}}/>
                      //     <Text>{item.post.description}</Text>
                      //     <Text> {item.post.author.displayName}</Text>
                      //     <Text>{item.text}</Text>
                      // </View>
                      <View>

                        <View style={profileStyles.titleandIcon}>
                        <FontAwesome name="heart" 
                                  size={20} 
                                  color={'#F68444'} />
                          <Text style={profileStyles.titleFavorites}> My favorites: </Text>
                        </View>
                 
                        <Image style={homeStyles.image} source={{uri: item.post.imageURL}}/>
                        <Text style={profileStyles.title}>{item.post.title}</Text>
                        <Text style={profileStyles.descriptions}>{item.post.description}</Text>
                        
                      
                      </View>
              );
            }}/>
          </View>
        </View>
        </ScrollView>
      )
    }
  

  componentDidMount = () => {
  }

}