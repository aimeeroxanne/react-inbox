import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import Messages from './components/messages.js';
import ComposeForm from './components/compose.js'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages : [],
      allSelected: false,
      someSelected: false,
      readCount: 4,
      showCompose: false
    }
  }

  async componentDidMount(){
    let response = await fetch('http://localhost:8082/api/messages')
    let json = await response.json()
    let selected = json.filter(message => message.selected)
    let unRead = json.filter(message => !message.read)
    if(selected.length === 0){
      this.setState({messages: json, allSelected: false, someSelected: false, readCount: unRead.length})
    }
    else if(selected.length >= 1){
      this.setState({messages: json, allSelected: false, someSelected: true, readCount: unRead.length})
    }
    if(selected.length === json.length){
      this.setState({allSelected: true, someSelected: true, readCount: unRead.length})
    }
  }

  showCompose = () => {
    if(this.state.showCompose){
      this.setState({showCompose: false})
    }
    else {
      this.setState({showCompose: true})
    }
  }

  compose = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  send = async (e) => {
    e.preventDefault()

    let newMessage = {
      subject: this.state.subject,
      body: this.state.body
    }

    let postMessage = await fetch('http://localhost:8082/api/messages',{
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let message = await postMessage.json()

    this.setState({messages: [...this.state.messages, message], showCompose: false})
  }

  update = async (idArr, command, prop, value) => {
    let message = {
      messageIds: idArr,
      command: command,
      [prop]: value
    }

    const updateMessages = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let updatedMessages = await updateMessages.json()
    let unRead = updatedMessages.filter(message => !message.read)
    let selectedMessages = updatedMessages.filter(message => message.selected)

    if(selectedMessages.length === 0){
      this.setState({messages: updatedMessages, readCount: unRead.length, allSelected: false, someSelected: false})
    }
    else if (selectedMessages.length > 0 && selectedMessages.length < updatedMessages.length){
      this.setState({messages: updatedMessages, readCount: unRead.length, allSelected: false, someSelected: true})
    }
    else{this.setState({messages: updatedMessages, readCount: unRead.length, allSelected: true, someSelected: true})}

  }

  expandMessage = (id) => {
    console.log(id)
  }

  star = (id) => {
    let update = this.update
    let messages = this.state.messages
    let selectedMessage = messages.filter(message => message.id === id)
    let value

    if(selectedMessage.starred === true){
      value = false
    } else {value = true}

    update([id], "star", "starred", value)
  }

  select = (id) => {
    let update = this.update
    let messages = this.state.messages
    let selectedMessage = messages.filter(message => message.id === id)
    let value

    if(selectedMessage.selected === true){
      value = false
    } else {value = true}

    update([id], "select", "selected", value)
  }

  selectAll = (e) => {
    let update = this.update
    let messages = this.state.messages
    let notSelected = messages.filter(message => !message.selected)
    let selected = messages.filter(message => message.selected)
    let ids = []
    let value = true

    if(this.state.allSelected === false){
      notSelected.map(message => ids.push(message.id))
        // this.setState({allSelected: true, someSelected: true})
    }

    else {
      selected.map(message => ids.push(message.id))
      // this.setState({allSelected: false, someSelected: false})
    }

    update([...ids], "select", "selected", value)

  }

  read = () => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let value = true
    let selectedMessages = messages.filter(message => message.selected)

    selectedMessages.map(message => ids.push(message.id))
    // let unRead = messages.filter(message => message.read === false)
    // this.setState({messages: messages, readCount: unRead.length})
    update([...ids], "read", "read", value)
  }

  unread = () => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let value = false
    let selectedMessages = messages.filter(message => message.selected)

    selectedMessages.map(message => ids.push(message.id))
    update([...ids], "read", "read", value)
  }

  delete = () => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let selectedMessages = messages.filter(message => message.selected)

    selectedMessages.map(message => ids.push(message.id))

    this.setState({someSelected: false, allSelected: false})
    update([...ids], "delete", null, null)
  }

  addLabel = (e) => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let value = e.target.value
    let selectedMessages = messages.filter(selectedMessage => selectedMessage.selected)

    selectedMessages.map(message => ids.push(message.id))
    update([...ids], "addLabel", "label", value)
  }

  removeLabel = (e) => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let value = e.target.value
    let selectedMessages = messages.filter(selectedMessage => selectedMessage.selected)

    selectedMessages.map(message => ids.push(message.id))

    update([...ids], "removeLabel", "label", value)
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          showCompose={this.showCompose}
          selectAll={this.selectAll}
          allSelected={this.state.allSelected}
          someSelected={this.state.someSelected}
          read={this.read}
          unread={this.unread}
          delete={this.delete}
          readCount={this.state.readCount}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          update={this.update}/>
        {this.state.showCompose ? <ComposeForm compose={this.compose} send={this.send}/> : <div></div>}
        <Messages
        read={this.isRead}
        messages={this.state.messages}
        select={this.select}
        star={this.star}
        expandMessage={this.expandMessage}
        update={this.update}
        />
      </div>
    )
  }
}

export default App;
