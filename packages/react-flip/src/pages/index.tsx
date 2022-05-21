import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDark } from '../hooks'
import Flip from '~/components/Flip'

function Index() {
  const { isDark, toggleDark } = useDark()

  return (
    <div className='text-center'>
    <div>asdas</div>
      <div className='text-center py-6 flex justify-center'>
        <div onClick={toggleDark}>
          {
            isDark 
            ?  <span className='i-carbon-moon text-gray-200' ></span>
            :  <span className='i-carbon-sun' ></span>
          }
        </div>
        <a href='https://github.com/tisou1/react-lite' target='_blank'>
          <span className='i-carbon-logo-github ml-3'></span>
        </a>
      </div>
{/* asda */}
      <Flip/>
    </div>
  )
}

export default Index