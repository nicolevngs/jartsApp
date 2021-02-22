import React from 'react'
import { Image, View, Text,TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import { getDataModel } from './DataModel';
import { UploadPostStyle,homeStyles } from './Styles';


export class UploadPostScreen extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = { image: null, title: '', description: '', loading: false } 
        this.self = this.props.route.params.currentUser;
        this.dataModel = getDataModel();       
        
    }
 

  onChangeTitle = title => {
    this.setState({ title })
  }
  onChangeDescription = description => {
    this.setState({ description })
  }

  componentDidMount() {
    this.getPermissions();

  }

  getPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  onSubmit = async () => {
    try {
      const post = {
        photo: this.state.image,
        title: this.state.title,
        description: this.state.description
      }
      this.props.firebase.uploadPost(post)

      this.setState({
        image: null,
        title: '',
        description: ''
      })
    } catch (e) {
      console.error(e)
    }
  }

  selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
    })
    if (result) {
        this.setState({image: result.uri})
    }
  }

  render() {
    if (this.state.loading) {
        return <ActivityIndicator size="large" color="black" />
    }

    return (
      <View style={{ flex: 1, marginTop: 60 }}>
        <View>
        <Text style={UploadPostStyle.header22}>Create New Post</Text>
          {this.state.image ? (
            <Image
              source={{uri: this.state.image}}
              style={{ width: '100%', height: 300 }}
            />
          ) : (
            <TouchableOpacity style={UploadPostStyle.Addimage}
              onPress={this.selectImage}>
            <Text style={UploadPostStyle.AddimageT}>Add an image</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={UploadPostStyle.postinghere}>
          <Text style={UploadPostStyle.PostDetails}> Post Details: </Text>
          <TextInput style={UploadPostStyle.Addtitle}
            placeholder='Enter title of the post'
            value={this.state.title}
            onChangeText={title => this.onChangeTitle(title)}
          />
          <TextInput style={UploadPostStyle.AddDescription}
            placeholder='Enter a description'
            value={this.state.description}
            onChangeText={description => this.onChangeDescription(description)}
          />
          <TouchableOpacity
                style={UploadPostStyle.SubmitPost}
                onPress={ async ()=> {
                this.setState({loading: true})
                await this.dataModel.addPost(this.state.title, this.state.description, this.state.image, this.self)
                this.setState({loading: false})
                this.props.navigation.navigate('Home')

            }}>
          <Text style={UploadPostStyle.SubmitTitle} >Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
