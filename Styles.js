import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export const colors = {
  primary: '#F68444', // orange
  primaryDark: '#F68444', // MD Brown 300
  primaryLight: '#E8EAF6', // MD Amber 200
  outline: '#BDBDBD' // MD Gray 400
}

export const postFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 20
  },
  postListContainer: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    //width: '100%',
  }
})


export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
    topView: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
      
    },
      logoImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
      },
    middleView: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        
      },
     
        inputLabel: {
          flex: 0.3,
          justifyContent: 'flex-end',
          paddingRight: 5,
          textAlign: 'right',
          fontSize: 10
        },
        inputText: {
          flex: 0.7,
          borderColor: colors.outline,
          paddingLeft: 5,
          borderBottomWidth: 0,
          fontSize: 18,
          backgroundColor: '#E8E7E7',
          height: 40,
          width: 130,
          borderRadius: 5
        },
      bottomView: {
        flex: 0.4,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        
      },
        buttonContainer: {
          justifyContent: 'center',
          marginLeft: 8,
          borderWidth: 1,
          borderColor: colors.outline,
          borderRadius: 6,
          backgroundColor: colors.primary,
          width: 148,
          height: 50,
          top: 15,
        
        },
        buttonContainer2: {
          justifyContent: 'space-around',
          marginRight: 8,
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 6,
          backgroundColor: 'white',
          width: 148,
          height: 50,
          top: 15
        },
     
          buttonText: {
            textAlign: 'center',
            color: 'white',
          },
          buttonText2: {

            textAlign: 'center',
            color: colors.primary
          }
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    width: '100%', 
    padding: '5%'
  },
  image: {
    width:320, 
    height:300,
  },

  titleandlike: {
    width:'100%',
    paddingTop:15,
    paddingLeft: 10,
    paddingRight:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: { 
    fontSize: 22, 
    fontWeight: '600',
    color: colors.primary
  },


  descriptions: {
    paddingTop:5,
    paddingLeft: 10,
    paddingRight:10,
    fontSize: 14, 
    color: 'gray',
    width: '100%',

  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },

  headerParent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 50,
    paddingRight: 50,
    marginTop:20,
    marginBottom: 17
  },

  appName: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C7C7C',
    
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 15,
    marginBottom: 10
  },

  search: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      borderRadius: 25,
      borderColor: colors.primary,
      borderWidth: 1,
      marginLeft:20,
      marginRight: 20,
      marginBottom: 20
  },

  });

export const peopleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
    peopleListContainer: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      width: '90%',
    },  
      separator: {
        backgroundColor: colors.primaryLight,
        height: 1,
        width: '90%',
        alignSelf: 'center'
      },
      personRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
      },
        personText: {
          fontSize: 16,
        }
});

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
    messageListContainer: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'stretch',
      width: '100%',
      alignSelf: 'center',
      paddingTop: '3%'
    },
      chatTextSelfContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5, 
        marginRight: 20,
        marginLeft: 40,
        backgroundColor: 'lightblue',
        borderRadius: 6
      },
        chatTextSelf: {
          fontSize: 18,
          textAlign: 'right',
        },
      chatTextOtherContainer: {
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5, 
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: 'lightgray',
        borderRadius: 6
      },
        chatTextOther: {
          fontSize: 18,
          textAlign: 'left',
        },
    inputContainer: {
      flex: 0.1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },  
      inputBox: {
        flex: 0.8,
        borderWidth: 1,
        borderColor: colors.primaryDark,
        borderRadius: 6,
        alignSelf: 'center',
        fontSize: 18,
        height: 40,
        padding: 5,
        margin: 5
      }
});

export const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: '5%',
    // backgroundColor: 'yellow'
    },
  topView: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    // backgroundColor: 'green'
  },
  bottomView: {
    flex: 1,
    
  },
  savedPostList: {
    marginTop:25
  },

  title: { 
    marginTop:10,
    fontSize: 22, 
    fontWeight: '600',
    color: colors.primary
  },

  descriptions: {
    fontSize: 14, 
    color: 'gray',
    marginTop: 8
  },

  titleandIcon: {
    flexDirection: "row",
    alignItems: 'center'

  },

  titleFavorites: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 15
  },

  displayName: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20
  },
  myChatsButton: {
    borderWidth: 1,
    borderColor: '#F68444',
    borderRadius: 5,
    padding: 10,
  }

});

export const detailsStyle = StyleSheet.create({
  image: {
    width:320,
    height:300,
    },

  detailsContainer: {
    alignItems: 'center',
  },

  inputContainer: {
    marginTop: 30,
   
  },

  inputRow: {
    flexDirection: "row",
    width: '100%',
    height: 40,
  },

  comments: {
    paddingRight:40,
    paddingLeft:40,
    width: '100%',
    marginTop: 10,
  },

  title: {
    paddingTop:15,
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary
  },
  descriptions: {
    padding:5,
    fontSize: 14,
    color: 'gray'
  },

  container: {
      flex: .9,
      backgroundColor: '#A9A9A9',
      width: '80%',
      alignItems: 'flex-start',
      justifyContent: 'center', 
    },
    
    heartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 45
    },


    heartText: {
      fontSize: 20,
    },

  root: {
    //backgroundColor: "gray",
    marginTop:10,
    width: '100%',
    height: '100%'
  },
  secondcontainer: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'column',
    marginBottom: 6,
    marginTop:10,
  },

  commentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
    color: colors.primary

  },

});

export const UploadPostStyle = StyleSheet.create({

  Addimage:{
  alignItems: 'center',
  padding: 10,
  margin: 30,
  height: 40,
  borderRadius: 20,
  borderColor: colors.primary,
  borderWidth: 1,
  
  },

  AddimageT: {
    color: colors.primary,
    fontSize:16,
    fontWeight:"bold",
  },

  Addtitle: {
  padding: 10,
  marginTop: 15,
  paddingRight: 90,
  paddingLeft: 90,
  borderRadius: 20,
  height: 55,
  borderColor: colors.primary,
  borderWidth: 1,

  },

  AddDescription: {
  marginTop: 15,
  paddingRight: 100,
  paddingLeft: 100,
  borderRadius: 20,
  height: 55,
  borderColor: colors.primary,
  borderWidth: 1,
  color: colors.primary,

  },

  SubmitPost: {
    alignItems:'center',
    marginTop: 48,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 15,
    height: 45,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderWidth: 1,
    

  },

  SubmitTitle: {
    fontSize: 20,
    marginTop:10,
    fontWeight: 'bold',
    color: 'white',
  },

  header22: {
    flexDirection: 'row',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 95
    
  },

  postinghere: {
    flexDirection: 'column',
    alignItems: 'center',

  },

  PostDetails: {
    marginTop: 40, 
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary,
  },

});