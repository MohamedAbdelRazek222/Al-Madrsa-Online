import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import avatar from '../data/avatar.jpg'
import { Cart, Chat, Notification, UserProfile } from "."
import { useStateContext } from '../contetxts/ContextProvider'
import { useDispatch, useSelector } from 'react-redux';
import { contextActions } from '../store/reducer/contextSlice'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 r-2 top-2' />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { ctx, activeMenu, screenSize } = useSelector(state => state.context);
  const dispatch = useDispatch()
  const { handleClick, setActiveMenu, setScreenSize } = contextActions;

  // const {ActiveMenu,setActiveMenu,isClicked,setIsClicked,handleClick,screenSize,setScreenSize}=useStateContext()

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth))
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false))
    } else {
      dispatch(setActiveMenu(true))
    }
  }, [screenSize])


  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" customFunc={() => dispatch(setActiveMenu(!activeMenu))} color="blue" icon={<AiOutlineMenu />} />

      <div className='flex'>
        <NavButton title="Cart" customFunc={() => dispatch(handleClick('cart'))} color="blue" icon={<FiShoppingCart />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => dispatch(handleClick('chat'))} color="blue" icon={<BsChatLeft />} />
        <NavButton title="Notifications" dotColor="#03C9D7" customFunc={() => dispatch(handleClick('notification'))} color="blue" icon={<RiNotification3Line />} />
        <TooltipComponent content="Profile" position='BottomCenter'>
          <div className='flex items-center gap-2 curser-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => dispatch(handleClick('userProfile'))}>
            <img src={avatar} alt="avatar" className='rounded-full w-8 h-8' />
            <p>
              <span className='text-gray-400 text-14'>Hi, </span>{''}
              <span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>
        {ctx.cart && <Cart />}
        {ctx.chat && <Chat />}
        {ctx.notification && <Notification />}
        {ctx.UserProile && <UserProfile />}

      </div>
    </div>
  )
}

export default Navbar