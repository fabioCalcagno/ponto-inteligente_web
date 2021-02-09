import './form.css';

function Form(props){

    
    return(
        <form autocomplete="on" className='form-container' onSubmit={props.onSubmit} >
            {props.children}
            <button type='submit' >{props.buttonLabel}</button>
        </form>    
    );
}

export default Form;