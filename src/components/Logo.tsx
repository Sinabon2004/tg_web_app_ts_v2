export default function Logo() {
    return (
        <div className='w-fit relative flex gap-0.5 items-center'>
            <img className='max-w-24 invert' src="/images/image.png" alt="wat-logo" />
            {/* <p className='text-sm uppercase font-inter font-semibold text-primary-white'>Чесноков Хрусталев Боровиков</p> */}
            {/* <div className='absolute right-0 translate-x-1/2 translate-y-1/4'>
                <img className='w-[58px]' src='/images/wat.svg' alt="wat-logo" />
            </div> */}
        </div>
    );
}