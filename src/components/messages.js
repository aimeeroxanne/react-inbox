import React, { Component } from 'react';
import Message from './message.js'

const Messages = (props) => {

  return (
    <div>
      {props.messages.map(item =>
      <Message
        key={item.id}
        id={item.id}
        subject={item.subject}
        read={item.read}
        starred={item.starred}
        selected={item.selected}
        labels={item.labels}
        select={props.select}
        star={props.star}
        />
      )}
    </div>
  )
}

export default Messages;
