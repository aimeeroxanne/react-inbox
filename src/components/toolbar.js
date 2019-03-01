import React from 'react';

const Toolbar = (props) => {
  return (
      <div className="row toolbar">
        <div className="col-lg-12">
          <p className="pull-right">
            <span className="badge badge">{`${props.readCount}`}</span>
            unread messages
          </p>

          <button className="btn btn-danger" onClick={props.showCompose}>
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={props.selectAll}>
            <i className={
              `fa ${props.someSelected && !props.allSelected ? 'fa-minus-square-o' : props.allSelected ? 'fa-check-square-o' : 'fa-square-o'}`
            }></i>
          </button>

          <button className="btn btn-default" onClick={props.read}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={props.unread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(e)=>{props.addLabel(e); e.target.selectedIndex = 0}}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"     onChange={(e)=>{props.removeLabel(e); e.target.selectedIndex = 0}}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={props.delete}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
  )
}

export default Toolbar;
