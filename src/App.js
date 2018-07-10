import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import Messages from './components/messages.js';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages: [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]
    }
  }



// Just console logging the event target for the checkboxes

  select = (e) => {
    console.log('is checked')
    const messages = this.state.messages
    for(let i = 0; i < messages.length; i++){
      if(messages[i].id === e){
        if(messages[i].selected === true){
          messages[i].selected = false
        }
        else {messages[i].selected = true}
      }
    }
    this.forceUpdate()
    console.log('newState:', this.state)
  }

  star = (e) => {
    const messages = this.state.messages
    for(let i = 0; i < messages.length; i++){
      if(messages[i].id === e){
        if(messages[i].starred === true){
          messages[i].starred = false
        }
        else {messages[i].starred = true}
      }
    }

    this.forceUpdate()
    console.log('newState:', this.state)
  }

  selectAll = (e) => {
    console.log('click is working')
    const messages = this.state.messages
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected != true){
        messages[i].selected = true
      }
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div className="container">
        <Toolbar selectAll={this.selectAll}/>
        <Messages
        read={this.isRead}
        messages={this.state.messages}
        select={this.select}
        star={this.star}/>
      </div>
    )
  }
}

export default App;
