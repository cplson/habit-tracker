import { useSelector, useDispatch } from 'react-redux';


function DateForm({isPut}){

    // store
    const habitLog = useSelector(store => store.habitLog);
    
    const handleSubmit = () => {
        // if(isPut){
        //     // PUT dispatch
        // }
        // else(
        //     // POST dispatch
        // )
    }
    // return(
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="date">
    //                 New habit:
    //                 <input
    //                     type="date"
    //                     name="description"
    //                     value={description}
    //                     required
    //                     onChange={(event) => setDescription(event.target.value)}
    //                 />
    //             </label>
    //     </form>
    // )
}

export default DateForm;