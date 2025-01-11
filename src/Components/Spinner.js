import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed left-0 loadingBg right-0 top-0 bottom-0 flex w-full items-center justify-center z-[60]">
      {/* <img src='/loading.webp' alt='loading' className='absolute left-0 top-0 right-0 bottom-0'/> */}

      <div className="loading-bar absolute top-0">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Spinner;
