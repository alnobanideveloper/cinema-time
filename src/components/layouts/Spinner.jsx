import spinner from './assests/spinner.gif'
const Spinner = ()=>{
    return (
        <div className='w-100 mt-20'>
            <img width={180} src={spinner} alt='loading...' className='text-center mx-auto'/>
        </div>
    );
}

export default Spinner;