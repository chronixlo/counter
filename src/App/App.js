import React, { Component } from 'react';
import './App.css';
import Counter from '../Counter/Counter';
import CounterDetails from '../CounterDetails/CounterDetails';

class App extends Component {
    constructor(props) {
        super(props);
        
        var stored = localStorage.getItem('data');
        
        stored = stored && JSON.parse(stored);
        
        this.state =  {
            items: stored || [{
                name: 'New item',
                counts: [],
                id: Date.now()
            }]
        };
        
        this.addItem = this.addItem.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.deleteCounter = this.deleteCounter.bind(this);
    }
    
    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state.items));
    }
    
    addItem() {
        this.state.items.push({
            name: 'New item',
            counts: [],
            id: Date.now()
        });
        
        this.setState(this.state);
    }
    
    onUpdate(index, data) {
        var items = this.state.items.slice();
        items[index] = data;
        
        this.setState({
            items: items
        });
    }
    
    onSelect(index) {
        this.setState({
            selectedCounter: index
        });
    }
    
    closeDetails(data) {
        var items = this.state.items.slice();
        
        items[this.state.selectedCounter] = data;
        
        this.setState({
            selectedCounter: undefined,
            items: items
        });
    }
    
    deleteCounter() {
        var items = this.state.items.slice();
        
        items.splice(this.state.selectedCounter, 1);
        
        this.setState({
            selectedCounter: undefined,
            items: items
        });
    }
    
    render() {
        return (
            <div className="app">
                {
                    this.state.selectedCounter !== undefined &&
                        <CounterDetails
                            close={this.closeDetails}
                            index={this.state.selectedCounter}
                            data={this.state.items[this.state.selectedCounter]}
                            onDelete={this.deleteCounter} />
                }
                
                <div className="app-counter-list">
                    {
                        this.state.items.map((item, index) => 
                            <Counter
                                key={item.id}
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
