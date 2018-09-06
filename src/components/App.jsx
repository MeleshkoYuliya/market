import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  static propTypes = {
    match: PropTypes.object
  };
  componentDidMount = () => {
    const { params } = this.props.match;
    //first reinstate our Localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    }); // add this data to firebase
  };

  componentDidUpdate = () => {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  };

  componentWillUnmount = () => {
    base.removeBinding(this.ref);
  };

  addFish = fish => {
    //1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //2. add our new fish
    fishes[`fish${Date.now()}`] = fish;
    //3. set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2. update that state
    fishes[key] = updatedFish;
    //3.set that to state
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = key => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes };
    //2. update the state
    fishes[key] = null;
    //3. update state
    this.setState({
      fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    //1. take a copy of state
    const order = { ...this.state.order };
    //2. either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    //3. Call setState  to update our state object
    this.setState({
      order: order
    });
  };

  removeFromOrder = key => {
    //1. take a copy of state
    const order = { ...this.state.order };
    //2. remove that item from order
    delete order[key];
    //3. Call setState  to update our state object
    this.setState({
      order: order
    });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          // {...this.state}
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          updateFish={this.updateFish}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}
export default App;
