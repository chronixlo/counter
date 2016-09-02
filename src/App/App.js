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
                properties: {
                    name: 'New item'
                },
                counts: [],
                id: Date.now()
            }]
        };
        
        this.addItem = this.addItem.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    
    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state.items));
    }
    
    addItem() {
        this.state.items.push({
            properties: {
                name: 'New item'
            },
            counts: [],
            id: Date.now()
        });
        
        this.setState(this.state);
    }
    
    onIncrement(index) {
        var items = this.state.items.slice();
        items[index].counts.push(new Date());
        
        this.setState({
            items: items
        });
    }
    
    onSelect(index) {
        this.setState({
            selectedCounter: index
        });
    }
    
    onClose(properties) {
        var items = this.state.items.slice();
        
        items[this.state.selectedCounter].properties = properties;
        
        this.setState({
            selectedCounter: undefined,
            items: items
        });
    }
    
    onDelete() {
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
                            close={this.onClose}
                            data={this.state.items[this.state.selectedCounter]}
                            delete={this.onDelete} />
                }
                
                <div className="app-counter-list">
                    {
                        this.state.items.map((item, index) => 
                            <Counter
                                key={item.id}
                                data={item}
                                select={this.onSelect.bind(this, index)}
                                increment={this.onIncrement.bind(this, index)} />
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
