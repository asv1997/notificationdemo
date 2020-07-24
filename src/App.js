import React from 'react'
import './App.css'


const App = () => {

    const sendNotificationFunc = () => {
        const publicVapidkey = 'BDup8DD2MjnqimdGpoyPxk7GeqVI9vxthPftPgZnZlQzEIvO10YqWuVXe9_J4DLoI40PliJMW-uquHKWKrQq3so';

// Check for service worker
        if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidkey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  await fetch("https://notifications1.herokuapp.com/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
    }

    const checkOnline = () => {
      return navigator.onLine()
    }

    if(checkOnline)
  {  return (
      
      <div className="App">
        <div className="ui container">  
          <div className="ui card">
          <div className="content">
         <div className="header">Notification Test</div>
          </div>
          <div className="content">
          <button className = "ui primary basic button " onClick = {() => sendNotificationFunc()}>Click me for notification</button>
          </div>
          </div>
           </div>
           </div>
    );}
    else{
      return(
        <div>
          <h1>You are offline!!!</h1>
        </div>
      )
    }
}

export default App;