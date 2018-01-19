import React from 'react'
import Button from '../Button';

function NavList({
  displayItems,
  onSelect
}) {
  console.log(displayItems)

  return (
    <div className="instrument-list">
      {
        displayItems.map((item) => (
          <Button 
            key={ item }
            text={ item }
            onToggle={ ()=>{ onSelect(item) } }
          />
        ))
      }
    </div>
  )
}

export default NavList