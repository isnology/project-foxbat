import React from 'react'
import Button from '../Button';

function NavList({
  displayItems,
  pictureItems,
  onSelect
}) {
  console.log(displayItems)
  const validPicturesIncluded = (!!pictureItems && displayItems.length === pictureItems.length)
  // if (validPicturesIncluded){
  //   console.log("valid Pictures were included")
  // }

  return (
    <div className="instrument-list">
      {
        displayItems.map((item, index) => (
          <Button 
            key={ index }
            text={ item }
            image= {validPicturesIncluded ? pictureItems[index] : ''}
            onToggle={ ()=>{ onSelect(item) } }
            />
          ))
        }
    </div>
  )
}

export default NavList