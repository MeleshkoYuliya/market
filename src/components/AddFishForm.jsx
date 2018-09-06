import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  statusRef = React.createRef();
  priceRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func
  };

  createFish = event => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      status: this.statusRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    };
    this.props.addFish(fish);
    //refresh the form
    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" name="name" ref={this.nameRef} placeholder="name" />
        <input
          type="text"
          name="price"
          ref={this.priceRef}
          placeholder="price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          ref={this.descRef}
          placeholder="desc"
        />
        <input
          type="text"
          name="image"
          ref={this.imageRef}
          placeholder="image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
