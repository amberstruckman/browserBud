import React from "react";

const EditMode = props => {

  const { editMode, modeChange } = props;

  return (
    <div className="EditMode">
    <input name="chkEditMode" type="checkbox" checked={editMode} onChange={ function() { modeChange() } } />
    </div>
  );
}


export default EditMode;
