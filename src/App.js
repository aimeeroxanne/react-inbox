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
      showCompose: false,
      allSelected: false,
      someSelected: false,
      readCount: 0 
    }
  }

  async componentDidMount(){
    let response = await fetch('http://localhost:8082/api/messages')
    let json = await response.json()
    let selected = json.filter(message => message.selected)
    let unRead = json.filter(message => !message.read)

    if(!selected.length){
      this.setState({
        messages: json,
        allSelected: false,
        someSelected: false,
        readCount: unRead.length})
    }

    else if(selected.length === json.length){
      this.setState({
        allSelected: true,
        someSelected: true,
        readCount: unRead.length})
    }
    else {
      this.setState({
        messages: json,
        allSelected: false,
        someSelected: true,
        readCount: unRead.length})
    }
  }

  showCompose = () => {
    this.setState({showCompose: !this.state.showCompose})
  }

  compose = (e) => {
    this.setState({[e.target.name]:e.target.value})
    console.log(this.state.subject)
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
        'Accept': 'application/json'
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

    if(!selectedMessages.length){
      this.setState({
        messages: updatedMessages,
        readCount: unRead.length,
        allSelected: false,
        someSelected: false})
    }
    else if (selectedMessages.length < updatedMessages.length){
      this.setState({
        messages: updatedMessages,
        readCount: unRead.length,
        allSelected: false,
        someSelected: true})
    }
    else{this.setState({
      messages: updatedMessages,
      readCount: unRead.length,
      allSelected: true,
      someSelected: true})}

  }

  star = (id) => {
    this.update([id], "star", "starred")
  }

  select = (id) => {
    this.update([id], "select", "selected")
  }

  selectAll = (e) => {
    let messages = this.state.messages
    let notSelected = messages.filter(message => !message.selected)
    let selected = messages.filter(message => message.selected)
    let ids = []

    if(!this.state.allSelected){
      notSelected.map(message => ids.push(message.id))
    }
    else {
      selected.map(message => ids.push(message.id))
    }

    this.update([...ids], "select", "selected", true)
  }

  read = () => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let selectedMessages = messages.filter(message => message.selected)

    selectedMessages.map(message => ids.push(message.id))
    // let unRead = messages.filter(message => message.read === false)
    // this.setState({messages: messages, readCount: unRead.length})
    update([...ids], "read", "read", true)
  }

  unread = () => {
    let update = this.update
    let messages = this.state.messages
    let ids = []
    let selectedMessages = messages.filter(message => message.selected)

    selectedMessages.map(message => ids.push(message.id))
    update([...ids], "read", "read", false)
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
