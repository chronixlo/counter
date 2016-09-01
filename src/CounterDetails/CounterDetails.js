import React, { Component } from 'react';
import './CounterDetails.css';

class CounterDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: this.props.data
        };
        
        this.close = this.close.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }
    
    close() {
        this.props.close(this.state.data);
    }
    
    nameChange(e) {
        this.state.data.name = e.target.value;
        this.setState(this.state);
    }
    
    render() {
        return (
            <div className="counterdetails">
                <div className="counterdetails-close">
                    <span onClick={this.close}>&#10005;</span>
                </div>
                
                <label htmlFor="name" className="label">Name</label>
                <input type="text" id="name" className="input" value={this.state.data.name} onChange={this.nameChange} />
            </div>
        )
    }
}

export default CounterDetails;
