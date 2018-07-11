import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import Messages from './components/messages.js';

const messagesData = [
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

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages : [...messagesData],
      allSelected: false,
      someSelected: true,
      readCount: 4
    }
  }


  star = (id) => {
    const messages = this.state.messages

    for(let i = 0; i < messages.length; i++){
      if(messages[i].id === id){
        if(messages[i].starred === true){
          messages[i].starred = false
        }
        else {messages[i].starred = true}
      }
    }

    this.setState({messages: messages})
    console.log('newState:', this.state)
  }


  select = (id) => {
    this.setState({allSelected: false})
    let messages = this.state.messages

    for(let i = 0; i < messages.length; i++){
      if(messages[i].id === id){
        if(messages[i].selected === true){
          messages[i].selected = false
        }
        else {
          messages[i].selected = true
        }
      }
    }

    this.setState({messages: messages})

    let selected = messages.filter(message => message.selected === true)

    if (selected.length === 0){
      this.setState({allSelected:false, someSelected: false})
    }

    else if(selected.length >= 1){
      this.setState({someSelected: true})
    }

    if(selected.length === messages.length){
      this.setState({allSelected: true})
      console.log(selected)
    }
  }


  selectAll = (e) => {
    let messages = this.state.messages

    if(this.state.allSelected === false){
      messages.map(message => message.selected = true)
      this.setState({allSelected: true, someSelected: true})
    }

    else {
      messages.map(message => message.selected = false)
      this.setState({allSelected: false, someSelected: false})
    }
  }

  read = (e) => {
    let messages = this.state.messages
    let readMessages = messages.filter(message => message.selected)
    readMessages.map(readMessage => readMessage.read = true)

    let read = messages.filter(message => message.read === false)
    this.setState({messages: messages, readCount: read.length})
  }

  unread = () => {
    let messages = this.state.messages
    for(let i = 0; i < messages.length; i++){
      if(messages[i].selected){
        if(messages[i].read){
          messages[i].read = false
        }
      }
    }
    let read = messages.filter(message => message.read === false)
    this.setState({messages: messages, readCount: read.length})
  }

  delete = () => {
    let messages = this.state.messages
    let notSelectedMessages = messages.filter(message => !message.selected)
    messages = [...notSelectedMessages]
    let read = messages.filter(message => message.read === false)
    this.setState({messages: messages, readCount: read.length, someSelected: false, allSelected: false})
  }

  addLabel = (e) => {
    let messages = this.state.messages
    let selectedMessages = messages.filter(selectedMessage => selectedMessage.selected)
    selectedMessages.map(selectedMessage => {
      if(!selectedMessage.labels.includes(e.target.value)){
        selectedMessage.labels.push(e.target.value)
      }
    })
    this.setState({messages: messages})
  }

  removeLabel = (e) => {
    let messages = this.state.messages
    let selectedMessages = messages.filter(selectedMessage => selectedMessage.selected)
    selectedMessages.map(selectedMessage => {
      let labels = selectedMessage.labels
      labels.map((label, index) => {
        labels.splice(index, 1)
      })

      // if(selectedMessage.labels.includes(e.target.value)){
      //   selectedMessage.map((label, index) => {
      //     selectedMessage.labels.splice(index, 1)
      //   })
      // }
    })
    this.setState({messages: messages})
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          selectAll={this.selectAll}
          allSelected={this.state.allSelected}
          someSelected={this.state.someSelected}
          read={this.read}
          unread={this.unread}
          delete={this.delete}
          readCount={this.state.readCount}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}/>
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
