import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword , signOut , onAuthStateChanged} from "firebase/auth";
import { getFirestore,collection , addDoc , updateDoc,doc ,query,where, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYMZqW7CTOPomAMdR2iI24d8YqYxDjpHw",
  authDomain: "movie-app04.firebaseapp.com",
  projectId: "movie-app04",
  storageBucket: "movie-app04.appspot.com",
  messagingSenderId: "892993567195",
  appId: "1:892993567195:web:a558f6752213412f920ffe",
  measurementId: "G-NW23524BRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const commentsCol = collection(db , "comments");
const auth = getAuth();

export const createUser = async (email, password)=>{
    let isErr = true;
    let msg = ''
    try{
        await createUserWithEmailAndPassword(auth , email, password)
        isErr = false;
    }catch(err){
        const message = err.message.split('/')[1].slice(0,-2);
        msg = message;
    } 
    finally{
        return {
            isErr,
            msg
        }
    }
    
}

export const login = async (email, password) => {
    let isErr = true;
    let msg = ''   
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Logged in user:", user);
        isErr=false;
    } catch (error) {
        console.error("Error logging in:", error.message);
        isErr = true;
        msg = error.message.split('/')[1].slice(0,-2);
    }
    finally{
        return {
            isErr,
            msg
        }
    }
};

export const logout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

export const fetchUserComments = async () => {
    const uid = localStorage.getItem("userID");
    let comments = [];
    try {
        const commentsQuery = query(commentsCol, where("userID", "==", uid));
        const querySnapshot = await getDocs(commentsQuery);
        
        querySnapshot.forEach(doc => {
            comments.push({...doc.data() ,id:doc.id})
        });
        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error.message);
    }
};

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user.uid);
        localStorage.setItem("userID" , user.uid);
        // Call the async function to fetch the user's comments
    } else {
        console.log("No user is signed in.");
    }
});

export const addComment =  async (comment , rating , type , id) => {
    const UID = auth.currentUser.uid;
    
    try{
            const docRef = await addDoc(commentsCol , {
                comment,
                rating,
                type,
                movieId:id,
                userID : UID
            })
            return docRef.id;
    }catch(error){
        console.log(error.message)
    }
}

export const updateComment = async (comment , rating  ,commentId) =>{
   const docRef = doc(db , 'comments' , commentId);
    updateDoc(docRef , {
        comment,
        rating
    })
    .then(()=>{
        console.log("document updated");
    })
}

