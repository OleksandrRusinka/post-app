import { FC } from 'react'

// interface
interface IProps {}

// component
const StarIconComponent: FC<Readonly<IProps>> = () => {
  // return
  return (
    <div className='relative h-5 w-5'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
        width='17'
        height='17'
        className='absolute'
      >
        <path
          fillRule='evenodd'
          d='M10 15.27 16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l4.46 3.73L3.82 18z'
          clipRule='evenodd'
        />
      </svg>

      <div className='absolute top-0 overflow-hidden text-[#f7b635]'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20' width='17' height='17'>
          <path
            fillRule='evenodd'
            d='M10 15.27 16.18 18l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l4.46 3.73L3.82 18z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </div>
  )
}

export default StarIconComponent
