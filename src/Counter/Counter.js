import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: this.props.data
        };
        
        this.increment = this.increment.bind(this);
        this.rename = this.rename.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }
    
    increment() {
        this.state.data.counts.push(new Date());
        this.setState(this.state);
        
        this.onUpdate();
    }
    
    countToday() {
        let count = 0;
        let now = new Date();
        let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        for (let i = this.state.data.counts.length - 1; i >= 0; i--) {
            if (this.state.data.counts[i] < midnight) {
                break;
            }
            
            count++;
        }
        
        return count;
    }
    
    rename() {
        let name = prompt('Give name');
        
        if (!name) {
            return;
        }
        
        this.state.data.name = name;
        this.setState(this.state);
        
        this.onUpdate();
    }
    
    onUpdate() {
        this.props.onUpdate(this.props.index, this.state.data);
    }
    
    render() {
        return (
            <div className="counter">
                <div></div>
                <div onClick={this.props.onSelect.bind(this, this.props.index)}>
                    <span className="counter-name">{this.state.data.name}</span>
                    <div className="counter-count">{this.countToday()}</div>
                </div>
                <div>
                    <span onClick={this.increment} className="counter-increment">+</span>
                </div>
            </div>
        )
    }
}

export default Counter;
