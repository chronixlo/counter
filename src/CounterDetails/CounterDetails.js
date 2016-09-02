import React, { Component } from 'react';
import './CounterDetails.css';

class CounterDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            properties: this.props.data.properties,
            confirmDelete: false,
            timeout: undefined
        };
        
        this.close = this.close.bind(this);
        this.deleteCounter = this.deleteCounter.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }
    
    componentWillUnmount() {
        clearTimeout(this.state.timeout);
    }
    
    close() {
        this.props.close(this.state.properties);
    }
    
    nameChange(e) {
        let properties = this.state.properties;
        properties.name = e.target.value;
        
        this.setState({
            properties: properties
        });
    }
    
    deleteCounter() {
        if (!this.state.confirmDelete) {
            let timeout = setTimeout(() => {
                this.setState({
                    confirmDelete: false
                });
            }, 1000);
            
            this.setState({
                confirmDelete: true,
                timeout: timeout
            });
        } else {
            this.props.delete();
        }
    }
    
    render() {
        return (
            <div className="counterdetails">
                <div className="counterdetails-close">
                    <span onClick={this.close}>&#10005;</span>
                </div>
                
                <label htmlFor="name" className="label">Name</label>
                <input type="text" id="name" className="input" value={this.state.properties.name} onChange={this.nameChange} />
                
                <span onClick={this.deleteCounter} className="button">
                    {this.state.confirmDelete ? 'Click again to confirm' : 'Delete counter'}
                </span>
            </div>
        )
    }
}

export default CounterDetails;
