import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Component } from "react";
import { getFunName } from "../helpers";

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object
  };
  myInput = React.createRef();

  goToStore = event => {
    //1. stop the form from submitting
    event.preventDefault();
    //2. get the text from the input
    const storeName = this.myInput.value.value;
    // 3. change the page to/store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>please Enter A Store</h2>
          <input
            type="text"
            // ref={(myInput)=> this.myInput=myInput}
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit"> Visit Store -></button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
