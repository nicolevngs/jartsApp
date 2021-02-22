import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';
import { useCallback } from 'react';

class DataModel {
  constructor() {
    if (firebase.apps.length === 0) { // aka !firebase.apps.length
      firebase.initializeApp(firebaseConfig);
    }
    this.usersRef = firebase.firestore().collection('users');
    this.chatsRef = firebase.firestore().collection('chats');
    this.postsRef = firebase.firestore().collection('posts');
    this.storageRef = firebase.storage().ref().child();
    this.users = [];
    this.chats = [];
    this.posts = [];
    this.chatListeners = [];
    this.asyncInit();
  }

  asyncInit = async () => {
    await this.loadUsers();
    await this.loadChats();
    await this.loadPosts();
    //this.subscribeToChats();
  }

  loadPosts = async () => {
    console.log("Loading posts");
    let querySnap = await this.postsRef.get();
    querySnap.forEach(async qDocSnap => {
      let data = qDocSnap.data();
      let thisPost = {
        key: qDocSnap.id,
        title: data.title,
        description: data.description,
        author: data.author,
        timestmap: data.timestamp,
        comments: []
      }

      let commentsRef = qDocSnap.ref.collection("comments");
      let commentsQSnap = await commentsRef.get();
      commentsQSnap.forEach(qDocSnap => {
        let commentData = qDocSnap.data();
        commentData.key = qDocSnap.id;
        thisPost.comments.push(commentData);
        console.log(thisPost);
      });
      this.posts.push(thisPost);
    });
  }


  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    });
  }


  getUsers = () => {
    return this.users;
  }

  createUser = async (email, pass, dispName) => {
    // assemble the data structure
    let newUser = {
      email: email,
      password: pass,
      displayName: dispName
    }

    // add the data to Firebase (user collection)
    let newUserDocRef = await this.usersRef.add(newUser);

    // get the new Firebase ID and save it as the local "key"
    let key = newUserDocRef.id;
    newUser.key = key;
    this.users.push(newUser);
    return newUser;
  }

  savePost = async (post, userKey) => {
    // assemble the data structure
    let postToSave = {
      post: post,
    }
    // this.usersRef = firebase.firestore().collection('users');
    // add the data to Firebase (user collection -> saved posts documents)
    // let newSavedPostDocRef = await this.usersRef.doc(userKey).add(postToSave);
    let newSavedPostDocRef = await this.usersRef.doc(userKey).collection('savedPosts');

    // get the new Firebase ID and save it as the local "key"
    let key = newSavedPostDocRef.id;
    postToSave.key = key;
    console.log("~~~~~savePost~~~~~~");
    console.log("postToSave: ", postToSave);
    newSavedPostDocRef.add(postToSave);
    return postToSave;
  }

  // loadSavedPosts = async (userKey) => {
  //   // this.usersRef = firebase.firestore().collection('users');
  //   let querySnap = await this.usersRef.doc(userKey).collection('savedPosts').get();
  //   querySnap.forEach(qDocSnap => {
  //     let key = qDocSnap.id;
  //     let data = qDocSnap.data();
  //     data.key = key;
  //     this.users.push(data);
  //   });
  

  getUserForID = (id) => {
    for (let user of this.users) {
      if (user.key === id) {
        return user;
      }
    }
    // will return undefined. No haiku this time...
  }

  getPostForID = (id) => {
    for (let post of this.posts) {
      if (post.key === id) {
        console.log(post);
        return post;
      }
    }
  }

  loadChats = async () => {
    let querySnap = await this.chatsRef.get();
    querySnap.forEach(async qDocSnap => {
      let data = qDocSnap.data();
      let thisChat = {
        key: qDocSnap.id,
        participants: [],
        messages: []
      }
      for (let userID of data.participants) {
        let user = this.getUserForID(userID);
        thisChat.participants.push(user);
      }

      let messageRef = qDocSnap.ref.collection("messages");
      let messagesQSnap = await messageRef.get();
      messagesQSnap.forEach(qDocSnap => {
        let messageData = qDocSnap.data();
        messageData.author = this.getUserForID(messageData.author);
        messageData.key = qDocSnap.id;
        thisChat.messages.push(messageData);
      });
      this.chats.push(thisChat);
    });
  }

  subscribeToChat = (chat, notifyOnUpdate) => {
    this.chatSnapshotUnsub = this.chatsRef.doc(chat.key)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((querySnap) => {
          chat.messages = [];
          querySnap.forEach((qDocSnap) => {
            let messageObj = qDocSnap.data();
            messageObj.key = qDocSnap.id;
            messageObj.author = this.getUserForID(messageObj.author);
            chat.messages.push(messageObj);
          });
          notifyOnUpdate(); // call back to the subscriber
        });
  }

  subscribeToPosts = (notifyOnUpdate) => {
    this.postsSnapshotUnsub = this.postsRef
        .orderBy('timestamp')
        .onSnapshot((querySnap) => {
          this.posts = [];
          querySnap.forEach((qDocSnap) => {
            let postObj = qDocSnap.data();
            postObj.key = qDocSnap.id;
            postObj.author = this.getUserForID(postObj.author);
            this.posts.push(postObj);
          });
          notifyOnUpdate(this.posts);
        });
  }

  subscribeToPost = (post, notifyOnUpdate) => {
    // console.log('Sub to post (data model)');
    this.postSnapshotUnsub = this.postsRef.doc(post.key)
        .collection('comments')
        .orderBy('timestamp')
        .onSnapshot((querySnap) => {
          post.comments = [];
          querySnap.forEach((qDocSnap) => {
            console.log('loop');
            let commentObj = qDocSnap.data();
            commentObj.key = qDocSnap.id;
            post.comments.push(commentObj);
          });
          // console.log(post);
          notifyOnUpdate(); // call back to the subscriber
        });
  }

  unsubscribeFromChat = (chat) => {
    // don't really need 'chat' but could need it in the future
    if (this.chatSnapshotUnsub) {
      this.chatSnapshotUnsub();
    }
  }

  unsubscribeFromPosts = () => {
    if (this.postsSnapshotUnsub) {
      this.postsSnapshotUnsub();
    }
  }

  unsubscribeFromPost = () => {
    if (this.postSnapshotUnsub) {
      this.postSnapshotUnsub();
    }
  }

  addChatListener = (listener, chatID) => {
    this.subscribeToChat(chatID);
    this.chatListeners.push({
      listener: listener,
      chatID: chatID
    });
  }

  notifyChatListeners = (_chatID) => {
    this.chatListeners.forEach(({listener, chatID}) => {
      if (chatID === _chatID) {
        listener.onChatUpdate();
      }
    });
  }

  getOrCreateChat = async (user1, user2) => {

    // look for this chat in the existing data model 'chats' array
    // if it's here, we know it's already in Firebase
    for (let chat of this.chats) {
      // we need to use user keys to look for a match
      // and we need to check for each user in each position
      if (( chat.participants[0].key === user1.key &&
          chat.participants[1].key === user2.key) ||
          ( chat.participants[0].key === user2.key &&
              chat.participants[1].key === user1.key)){
        return chat; // if found, return it and we're done
      }
    }

    // chat not found, gotta create it. Create an object for the FB doc
    let newChatDocData = { participants: [user1.key, user2.key] };
    // add it to firebase
    let newChatDocRef = await this.chatsRef.add(newChatDocData);
    // create a local chat object with full-fledged user objects (not just keys)
    let newChat = {
      participants: [user1, user2],
      key: newChatDocRef.id, // use the Firebase ID
      messages: []
    }
    // add it to the data model's chats, then return it
    this.chats.push(newChat);
    return newChat;
  }

  getChatForID = (id) => {
    for (let chat of this.chats) {
      if (chat.key === id) {
        return chat;
      }
    }
    // the chat was not found
    // should throw an error prob'ly
    // return undefined
    // [[almost accidental haiku]]
  }

  addPostComment = async (postID, comment) => {
    let commentsRef = this.postsRef.doc(postID).collection('comments');

    let fbCommentObject = {
      text: comment.text,
      timestamp: comment.timestamp,
      author: comment.author.key
    }

    commentsRef.add(fbCommentObject);

  }

  addChatMessage = async (chatID, message) => { // doesn't need to be async?

    let messagesRef = this.chatsRef.doc(chatID).collection('messages');

    let fbMessageObject = {
      type: 'text',
      text: message.text,
      timestamp: message.timestamp,
      author: message.author.key,
    }
    console.log("fbMessageObject: ", fbMessageObject);

    messagesRef.add(fbMessageObject); // onSnapshot will update local model
  }

  addChatImage = async (chat, author, imageObject) => {
    console.log('... and here we would add the image ...');
    console.log(imageObject);

    // handleTakePicture():
    // let picData = await this.camera.takePictureAsync();
    // this.dataModel.addChatImage(this.chat, this.currentUser, picData);

    // my attempt
    let messagesRef = this.chatsRef.doc(chat.key).collection('messages');
    console.log("chat.key: ", chat.key);


    // Set up storage refs and download URL
    let fileName = '' + Date.now();
    let imageRef = this.storageRef.child(fileName);
    // console.log("imageRef: ", imageRef);

    // fetch the image object from the local filesystem
    let response = await fetch(imageObject.uri);
    let imageBlob = await response.blob();
    console.log("imageBlob: ", imageBlob);


    // then upload it to Firebase Storage
    await imageRef.put(imageBlob);

    // ... and update the current image Document in Firestore
    let downloadURL = await imageRef.getDownloadURL();


    let fbImageObject = {
      height: imageObject.height,
      width: imageObject.width,
      imageURL: downloadURL,
      timestamp: Date.now()
    }
    //usually uri
    console.log("fbImageObject: ", fbImageObject);


    // let imageDocSnap = await this.messagesRef.get();
    // let finalImage = imageDocSnap.data();


    messagesRef.add(fbImageObject);


    // await messagesRef.set(fbImageObject);

    // this.addChatMessage(chat.key, fbImageObject);


  }

  addPost = async (title, description, imageUri, self) => {
    console.log('... and here we would add the image ...');
    console.log(imageUri);
  
    // handleTakePicture():
    // let picData = await this.camera.takePictureAsync();
    // this.dataModel.addChatImage(this.chat, this.currentUser, picData);
  
  
    // Set up storage refs and download URL
    let fileName = '' + Date.now();
    let imageRef = this.storageRef.child(fileName);
    // console.log("imageRef: ", imageRef);
  
    // fetch the image object from the local filesystem
    console.log("fetching from system");
    let response = await fetch(imageUri);
    let imageBlob = await response.blob();
  
  
    // then upload it to Firebase Storage
    console.log("uploding to firebase");
    await imageRef.put(imageBlob);
  
    // ... and update the current image Document in Firestore
    console.log("waiting for image url");
    let downloadImagePostURL = await imageRef.getDownloadURL();
    let author = self.key;
  
  
    let post = {
     // height: imageObject.height,
     // width: imageObject.width,
      author: author,
      title: title,
      likes: 0,
      description: description,
      imageURL: downloadImagePostURL,
      timestamp: Date.now()
    }
    //usually uri
    console.log("fbImageObject: ", post);
  
  
    // let imageDocSnap = await this.messagesRef.get();
    // let finalImage = imageDocSnap.data();
  
  
    this.postsRef.add(post);
  
  
    // await messagesRef.set(fbImageObject);
  
    // this.addChatMessage(chat.key, fbImageObject);
  
  
  }

  addLikes = async (post) => {
    this.postsRef.doc(post.key).update({likes: post.likes+1});
  }
    
  

  parseUnixTimestamp = (unix_timestamp) => {
    /* I took most of this thisfrom this
    StackOverflow: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd?page=1&tab=votes#tab-top
    */
    let d = new Date(unix_timestamp);

    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    let date = [year, month, day].join('-');
    let time = hour + ':' + minute;
    let datetime = date + ' ' + time;

    return datetime
  }
  

}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}