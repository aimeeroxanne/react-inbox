import React, { Component } from 'react';
import Label from './label.js'

const Message = (props) => {
  return (
    <div className={`row message ${props.read ? 'read' : 'unread'} ${props.selected ? 'selected' : ''}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={`${props.selected ? 'defaultChecked' : ''}`}
              onChange={() => props.select(props.id)}/>
          </div>
          <div className="col-xs-2">
            <i className={`${props.starred ? 'star fa fa-star' : 'star fa fa-star-o'}`} onClick={()=>{
              props.star(props.id)
            }}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <div className="labels">
          {props.labels.map((label, index) =>
            <Label
              key={index}
              label={label}/>)}
        </div>
        <a href="#">{props.subject}
        </a>
      </div>
    </div>
  )
}

export default Message;
