import React, { useState } from 'react';
import AddTableForm from './forms/AddTableForm'; // Adjust according to your folder structure
import TableAddButton from './buttons/TableAddButton'; // Your "Add Table" button
import TableDeleteButton from './buttons/TableDeleteButton';
import TableUpdateButton from './buttons/TableUpdateButton';
import TableDisplayButton from './buttons/TableDisplayButton';

function TableActions() {
  const [activeAction, setActiveAction] = useState(null); // Track the active form

  return (
    <div className="grid lg:grid-cols-2 mt-2">
      {/* Render the buttons only when no action is active */}
      {activeAction === null && (
        <>
          <TableAddButton setActiveAction={setActiveAction} />
          <TableDeleteButton setActiveAction={setActiveAction} />
          <TableUpdateButton setActiveAction={setActiveAction} />
          <TableDisplayButton setActiveAction={setActiveAction }/>
          {/* Add other buttons like delete, update, etc. */}
        </>
      )}

      {/* Conditionally render the forms based on activeAction */}
      {activeAction === 'add' && <AddTableForm setActiveAction={setActiveAction} />}
      {/* Add other forms like delete, update, etc. */}
    </div>
  );
}

export default TableActions;
