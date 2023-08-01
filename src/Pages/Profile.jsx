import React, { useContext } from 'react'
import { useAuth } from '../AuthContext';

export default function Profile() {

  const {user} = useContext(useAuth)  
  return (
    <div>
      {
        user && user?
        <>
          <h4>Email: {user && user.name}</h4>
          <h4>Created-at: {user && user.created_at}</h4>
          <h4>Updated-at: {user && user.updated_at}</h4>
        </>
        :
        <div className='text-info'>
            Login to view your profile details
        </div>
      }
    </div>
  )
}