import { Loader } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className='grid h-full w-full place-content-center'>
      <div className='loader' />
    </div>
  );
}

export default loading;
