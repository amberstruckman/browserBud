import React from "react";

const EditMode = props => {

  const { editMode, onChange } = props;

  return (
    <div className="EditMode">
      <input id="editModeCheckbox" type="checkbox" checked={editMode} onChange={onChange} />
      <label htmlFor="editModeCheckbox">Edit mode</label>
    </div>
  );
}

export default EditMode;
