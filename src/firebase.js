import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCcO9KPTZWMBntqap0pbmTEscTi8GiTFOg",
    authDomain: "otp-demo-acf37.firebaseapp.com",
    projectId: "otp-demo-acf37",
    storageBucket: "otp-demo-acf37.appspot.com",
    messagingSenderId: "35973732064",
    appId: "1:35973732064:web:4334c289a7bd82d7006285",
    measurementId: "G-5YCHEXYX42"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default firebaseConfig;