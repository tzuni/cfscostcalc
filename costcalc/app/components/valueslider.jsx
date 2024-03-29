import React from 'react';

export default class ValueSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.callback = props.callback
    this.delCallback = props.delCallback
    this.label = props.label
    this.id = props.id
  }

  handleValueChange(value){
    // convert value string to float
    var numval = Number.parseFloat(value.replace(/[^\d.]/g, ''))
    if (Number.isNaN(numval)){ numval = 0 }

    if (numval !== this.state.value){
      // TODO: validate inputs

      // update callback
      this.callback(numval)

      // update internal state
      const newState = Object.assign({}, this.state)
      newState.value = numval
      this.setState(newState)
    }
  }

  render(){
    return(
      <div className={'cfs-input-div'} id={this.id}>
        <div>
          <i className={"fas fa-times-circle cfs-button-x"}
            onClick={() => this.delCallback()}></i>
        </div>
        <div className={'cfs-input-container'}>
          <label htmlFor={this.id} className={'cfs-input-label'}>{this.label + " : "}</label>
          <span className={'.cfs-input-dollar'}>$</span>
          <input
            type={'text'}
            className={'cfs-input'}
            value={toCurrency(this.state.value)}
            id={this.id}
            onChange={(e) => this.handleValueChange(e.target.value)}
            />
        </div>
      </div>
    )
  }
}

function toCurrency(value){
  // convert numeric value to currency string
  const style = {
    // style: 'currency',
    // currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }
  return value.toLocaleString('en-US', style)
}