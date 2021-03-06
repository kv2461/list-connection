import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import FileBase from 'react-file-base64';
import { StyledForm, StyledButton, StyledPaper, StyledFileInput, StyledDivImageSection, StyledImgMedia } from './styles';
import { useDispatch } from 'react-redux';

import { UpdateUser } from '../../../actions/users';
// import {CreatePost, UpdatePost} from '../../actions/posts';


const UserForm = ({ user, setEditProfile }) => {
    const [userData,setUserData] = useState({
      ...user
    });

    const [firstName, setFirstName] = useState(userData.name.split(' ')[0]);
    const [lastName, setLastName] = useState(userData.name.split(' ')[1]);
    const [bio, setBio] = useState(userData?.bio);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (firstName && lastName) {
            setUserData({...userData,name:`${firstName} ${lastName}`})
        }

        if (bio !== user.bio) {
            setUserData({...userData, bio:bio})
        } 
    },[firstName, lastName, bio, user.bio, userData])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(UpdateUser(user._id,userData));

  
        setEditProfile(false);  

        return data;
      }

    const reset = (user) => {
        setUserData({...user});
        setFirstName(userData.name.split(' ')[0]);
        setLastName(userData.name.split(' ')[1]);
        setBio(userData.bio || '')
      }

    
  return (
    <StyledPaper>
      <StyledForm autoComplete='off' noValidate onSubmit={()=>{}}>
        <Typography variant='h6'>Edit Information
          <Button onClick={()=>setEditProfile(false)}>Cancel</Button>
        </Typography>
        <TextField required name='firstname' variant='outlined' label='First Name' fullWidth value={firstName} onChange={(e) =>setFirstName(e.target.value)}/>
        <TextField required name='lastname' variant='outlined' label='Last Name' fullWidth value={lastName} onChange={(e) =>setLastName(e.target.value)}/>
        <TextField  name='bio' variant='outlined' label='Bio' fullWidth multiline rows={6}value={bio} onChange={(e)=>setBio(e.target.value)} />
        {/* <TextField name='description' variant='outlined' label='Description' fullWidth value={postData.description} onChange={(e) =>setPostData({...postData, description:e.target.value})}/>
        <TextField sx={{m:'10px 0'}} name='search' variant='outlined' label='Add Search Tags By Pressing Enter' fullWidth onKeyPress={(e)=>handleAddTag(e)} onChange={(e)=>setTagToAdd(e.target.value)} value={tagToAdd}/>
          {postData.tags.length  ? <Container>
          {postData.tags.map((tag,index)=> <Chip sx={{width:1/2, bgcolor:'primary.light', color:'white'}} key={index} onDelete={handleDeleteTag(tag)} label={tag}/>)}  </Container>: null} */}
        <StyledFileInput>
          <FileBase 
            type='file'
            multiple={false}
            onDone={({base64})=> setUserData({...userData,selectedFile:base64})}
          />
        </StyledFileInput>
        <StyledDivImageSection>
          <StyledImgMedia src={userData.selectedFile} />
        </StyledDivImageSection>
        <StyledButton sx={{bgcolor:'primary.main'}}variant='container' size='large' onClick={handleSubmit} fullWidth>Submit</StyledButton>
        <Button sx={{bgcolor:'secondary.main'}}variant='container' size='small' onClick={()=>reset(user)} fullWidth>Reset</Button>
      </StyledForm>
    </StyledPaper>
  )
}

export default UserForm