import React, { Component } from 'react';
import './App.css';
import Counter from '../Counter/Counter';
import CounterDetails from '../CounterDetails/CounterDetails';

class App extends Component {
    constructor(props) {
        super(props);
        
        var stored = localStorage.getItem('data');
        
        stored = stored && JSON.parse(stored);
        
        this.state = stored || {
            items: [{
                name: 'New item',
                counts: []
            }]
        };
        
        this.addItem = this.addItem.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.storeState = this.storeState.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
    }
    
    addItem() {
        this.state.items.push({
            name: 'New item',
            counts: []
        });
        
        this.setState(this.state);
        
        this.storeState();
    }
    
    onUpdate(index, data) {
        this.state.items[index] = data;
        this.setState(this.state);
        
        this.storeState();
    }
    
    onSelect(index) {
        this.setState({
            selectedCounter: index
        });
    }
    
    storeState() {
        localStorage.setItem('data', JSON.stringify(this.state));
    }
    
    closeDetails(data) {
        this.state.items[this.state.selectedCounter] = data;
        this.state.selectedCounter = undefined;
        
        this.setState(this.state);
        this.storeState();
    }
    
    render() {
        return (
            <div className="app">
                {
                    this.state.selectedCounter !== undefined &&
                        <CounterDetails
                            close={this.closeDetails}
                            index={this.state.selectedCounter}
                            data={this.state.items[this.state.selectedCounter]} />
                }
                
                <div className="app-counter-list">
                    {
                        this.state.items.map((item, index) => 
                            <Counter
                                key={index}
                                index={index}
                                data={item}
                                onSelect={this.onSelect}
                                onUpdate={this.onUpdate} />
                        )
                    }
                </div>
                
                <div className="app-bottombar">
                    <div onClick={this.addItem}>Add item</div>
                </div>
            </div>
        );
    }
}

export default App;
