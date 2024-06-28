import React from 'react'
import AddNewPost from '../components/AddNewPost'
import Post from '../components/Post'

const Homepage = () => {
  return (
    <div className='px-2'>
      <AddNewPost />

      {/* posts */}
      <div className='flex flex-col gap-6 mt-4'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>

    </div>
  )
}

export default Homepage
