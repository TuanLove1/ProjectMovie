import React from 'react'
import UserLoginTemplate from '.';
import Auth from '../AdminTemplate/Auth';


const WapperCard = UserLoginTemplate(Auth);
export default function LoginRegister() {
  return (
    <div>
        <WapperCard/>
    </div>
  )
}
