import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../Redux/Slice/commonSlice'
import Toast from 'react-native-toast-message'


const GlobalToast = () => {
    const {toastVisible,toastType,toastMessage}=useSelector((state)=>state.commonState)
    const dispatch = useDispatch()

    useEffect(()=>{
        if (toastVisible) {
            Toast.show({
              type:toastType,
              text1: toastMessage,
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
              swipeable:true,
              onHide: () => dispatch(hideToast()),

            });
          }
    },[toastVisible])
  return null
}

export default GlobalToast