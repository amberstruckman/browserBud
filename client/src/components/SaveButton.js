import React from "react";

class SaveButton extends React.Component {
  render() {
    return (
      <div className="SaveButton">
        <button onClick={ this.props.onClick }>Save data to /api/browser</button>
      </div>
    );
  }
}

export default SaveButton;
