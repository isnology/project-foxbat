import React from 'react'
import Button from '../Button'
import { sideBarMessages } from '../../constants/messages'

function NavList({
  displayItems,
  modelObjects,
  onSelect
}) {
  
  function renderToNavList() {
    if (!!modelObjects) {
      return(
        modelObjects.map((object, index) => (
          <Button 
            key={ index }
            text={ object.name }
            image= {!!object.pictureURL ? object.pictureURL : ''}
            onToggle={ ()=>{ onSelect(object) } }
            />
          ))
        )
    }
    else if (!modelObjects && displayItems.length > 0) {
      return( 
        displayItems.map((item, index) => (
        <Button 
          key={ index }
          text={ item }
          // image= {validPicturesIncluded ? pictureItems[index] : ''}
          onToggle={ ()=>{ onSelect(item) } }
          />
        ))
      )
    }
    else {
      return(sideBarMessages.noItems)
    }
  }

  return (
    <div className="instrument-list">
      { renderToNavList() }
    </div>
  )
}

export default NavList