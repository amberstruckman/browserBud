import React from "react";

const EditMode = props => {

  const { editMode, onChange } = props;

  return (
    <div className="EditMode">
      <input name="editModeCheckbox" type="checkbox" checked={editMode} onChange={onChange} />
      <label for="editModeCheckbox">Edit mode</label>
    </div>
  );
}

export default EditMode;
