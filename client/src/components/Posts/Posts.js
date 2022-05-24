import React from 'react'
import {Grid, CircularProgress} from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { StyledGrid } from './styles';


const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.postsSlice)

  
  return (
    !posts.length ? <CircularProgress /> : (
      <StyledGrid container alignItems='stretch' spacing={3}>
        {posts.map((post)=> (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </StyledGrid>
    )
  )
}

export default Posts