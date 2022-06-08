import React, { useState, useEffect } from 'react'
import { ListSubheader, ListItem, ListItemText, Typography, Box, Divider, Button} from '@mui/material';
import { DeleteForever, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';


const FoodListItem = ({ listItem, index, handleDelete, length, handleMoveUp, handleMoveDown, subgenre, }) => {
  // const [hover, setHover] = useState(false)
  const [name,setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [measurements, setMeasurements] = useState('');
  const [itemKey, setItemKey] = useState('');

  useEffect(() => {

    switch(subgenre) {
      case 'foodRecipe':
        setName(listItem?.ingredientName);
        setMeasurements(listItem?.measurements);
        setImage(listItem?.image);
        setItemKey(listItem?.key);
        setDescription(listItem?.comments);
        break;
      case 'instructions':
        setName(listItem?.instruction);
        setItemKey(listItem?.key)
        setDescription(listItem?.comments)
        break;
      default:
        break;
    }


  },[subgenre,listItem])

  return (
    <li key={itemKey}>
        <ul>
           {index > 0 ? <Divider sx={{borderBottomWidth:3}} /> : null}
            { subgenre === 'foodRecipe' ? 
              <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</ListSubheader>
             : <ListSubheader sx={{fontWeight:700 ,lineHeight:1, p:2}} >{name}</ListSubheader>
            }

            <ListItem key={itemKey}>
              {subgenre === 'foodRecipe' && image !== null && (<Box component='img' sx={{m:1,p:1, maxHeight:'40px', maxWidth:'40px'}} src={image}/>)}
                <ListItemText 
                  disableTypography 
                  primary={ <>
                  <Typography fontSize='0.8rem'> 
                    {description ? description : null }
                  </Typography>

                  {subgenre === 'foodRecipe' && <Typography fontSize='0.8rem'> 
                    {measurements? `${measurements}` : null }
                  </Typography>}
                  </>}


                 />
                 {handleDelete ? <Button onClick={handleDelete}><DeleteForever/></Button> : null}
                 <Box sx={{display:'flex', flexDirection:'column'}}>
                      {index===0 ? null : <Button onClick={handleMoveUp}><KeyboardArrowUp/></Button>}
                      {index===length ? null : <Button onClick={handleMoveDown}><KeyboardArrowDown/></Button>}


                 </Box>
            </ListItem>
        </ul>
    </li>
  )
}

export default FoodListItem