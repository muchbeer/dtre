import { Backdrop, CircularProgress } from "@mui/material";
import { useValue } from "../context/ContextProvider";
import React from 'react'

function Loading() {

        const { state: { loading }, } = useValue();


  return (
    <Backdrop open = {loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  )
}

export default Loading;