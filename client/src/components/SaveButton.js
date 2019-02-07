import React from "react";

class SaveButton extends React.Component {
  render() {
    return (
      <div className="SaveButton">
        <button onClick={ this.props.onClick }>Replace the above links with some we've chosen.<br />Warning! This will overwrite the current links.</button>
      </div>
    );
  }
}

export default SaveButton;
