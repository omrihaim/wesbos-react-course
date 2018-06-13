import React from 'react';

import Inventory from './Inventory';
import Order from './Order';
import Header from './Header';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);

        if (localStorageRef) {
          this.setState({
            order: JSON.parse(localStorageRef)
          });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
          context: this,
          state: "fishes"
        });
    }

    componentWillUnmount() {
       base.removeBinding(this.ref);
     }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    addFish = fish => {
      const updatedFishes = {...this.state.fishes};
      updatedFishes[`fish${Date.now()}`] = fish;
      this.setState({
        fishes: updatedFishes
      })
    }

    editFish = (key, updatedFish) => {
        const updatedFishes = {...this.state.fishes };

        updatedFishes[key] = updatedFish;

        this.setState({ fishes: updatedFishes })
    }

    deleteFish = (key) => {
        const updatedFishes = {...this.state.fishes };

        updatedFishes[key] = null;

        this.setState({ fishes: updatedFishes })
    }

    loadSampleFishes = () => {
      this.setState({
        fishes: sampleFishes
      })
    }

    addToOrder = (key) => {
        const updatedOrder = {...this.state.order};

        updatedOrder[key] = updatedOrder[key] + 1 || 1;

        this.setState({order: updatedOrder});
    }

    removeFromOrder = (key) => {
        const updatedOrder = {...this.state.order};

        delete updatedOrder[key];

        this.setState({order: updatedOrder});
    }

    render() {
        return (
            <div className="catch-of-the-day">
             <div className="menu">
                <Header tagline="Fresh seafood market"/>
                <ul className="fishes">
                  {Object.keys(this.state.fishes).map(key =>
                  <Fish
                    key={key}
                    index={key}
                    details={this.state.fishes[key]}
                    addToOrder={this.addToOrder}
                  />)}
                </ul>
             </div>
                <Order
                  fishes={this.state.fishes}
                  order={this.state.order}
                  removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                  addFish={this.addFish}
                  loadSampleFishes={this.loadSampleFishes}
                  fishes={this.state.fishes}
                  updateFish={this.editFish}
                  deleteFish={this.deleteFish}
                />
            </div>
        )
    }
}
export default App;
