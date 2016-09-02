import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
    countToday() {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        let count = 0;
        
        for (let i = this.props.data.counts.length - 1; i >= 0; i--) {
            if (new Date(this.props.data.counts[i]) < midnight) {
                break;
            }
            
            count++;
        }
        
        return count;
    }
    
    render() {
        return (
            <div className="counter">
                <div></div>
                <div onClick={this.props.select}>
                    <span className="counter-name">{this.props.data.properties.name}</span>
                    <div className="counter-count">{this.countToday()}</div>
                </div>
                <div>
                    <span onClick={this.props.increment} className="counter-increment">+</span>
                </div>
            </div>
        )
    }
}

export default Counter;
