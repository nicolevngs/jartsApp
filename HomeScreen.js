import React from 'react';
import { TextInput, Text, View, Image,ScrollView,
  FlatList, KeyboardAvoidingView, ActivityIndicator } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { postFeedStyles } from './Styles';
import { getDataModel } from './DataModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { homeStyles } from './Styles';
import { FontAwesome } from '@expo/vector-icons'; 


export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.self = this.props.route.params.currentUser;


        this.state = {
          query: '',
          posts: this.dataModel.posts,
          filtered: this.dataModel.posts,
          loading: true,
        };

    }


    componentDidMount = () => {
      // Executed the first time the component is mounted
      this.subscribeToPosts();
    }

    componentWillUnmount = () => {
      // Executed before the component is unmounted
      // Unsubscribes me from post updates
      this.dataModel.unsubscribeFromPosts(this.posts);
    }

    subscribeToPosts = async() => {
      // Calls the dataModel.subscribeToPosts method and creates a listener for new posts, post updates
      this.dataModel.subscribeToPosts(this.onPostUpdate);
    }

    onPostUpdate = (posts) => {
      posts = posts.reverse();
      this.setState({loading:false, posts: posts, filtered: posts}); // On each update, use setState to update the state
    }

    handleSearch = text => {
      const formattedQuery = text.toLowerCase()
      const data = this.state.posts.filter( post => {
        return this.contains(post.title, formattedQuery)
      })
      this.setState({ filtered: data, query: text })
    }

    contains = (title, query) => {
      if (title.toLowerCase().includes(query)) {
        return true
      }
      return false
    }

    renderHeader = () => (
      <View style={homeStyles.search}>

        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.handleSearch}
          status='info'
          placeholder='Search'
          style={{
            borderRadius: 25,
            borderColor: '#333',
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
            textAlign: "center",
        
          }}
          textStyle={{ color: '#000' }}
        />
      </View>
    )

    render() {

      if (this.state.loading) {
        return <ActivityIndicator size="large" color="black" />
      }

        return (
        <ScrollView >
        <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', alignContent: 'flex-start', width: '100%'}}
        behavior={"height"}
        keyboardVerticalOffset={100}>
          <View style={homeStyles.headerParent}>
            <View style={homeStyles.appName}>
              <Text style={homeStyles.header1}>Jarts</Text>
            </View>
            <View style={homeStyles.headerContainer}>
              <FontAwesome name="user-circle-o" 
                            size={33} 
                            color={'#F68444'}
                            onPress={()=>this.props.navigation.navigate('Profile', {'currentUser': this.self})} />
              <FontAwesome name="plus-circle"
                        style={{
                          marginLeft: 18,
                        }} 
                            size={39} 
                            color={'#F68444'}
                            onPress={()=>this.props.navigation.navigate('Upload Post',{'currentUser': this.self} )} />
          </View>          
          </View>
          <Text style={homeStyles.header}>All posts</Text>

        <View style={postFeedStyles.postListContainer}>
          <FlatList 
            ListHeaderComponent={this.renderHeader}
            data={this.state.filtered}
            ref={(ref) => {this.flatListRef = ref}}
            // onContentSizeChange={() => {
            //   if (this.flatListRef) {
            //     this.flatListRef.scrollToTop();
            //   }
            // }}
            renderItem={({item})=>{
              return (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostDetail', {'postKey': item.key, 'currentUser': this.self})}>
                <View style={homeStyles.container}>
                 
                    <Image style={homeStyles.image} source={{uri: item.imageURL}}/>
                    <View style= {homeStyles.titleandlike}>
                      <Text style={homeStyles.title}>{item.title}</Text>
                      <TouchableOpacity onPress={()=> this.dataModel.addLikes(item)}>
                        <FontAwesome 
                        name="thumbs-up"
                        size={28} 
                        color={'#F68444'}/>
                        <Text> {(item.likes)} </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={homeStyles.descriptions}>{item.description}</Text>
                    
                </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
        )
    }
}
