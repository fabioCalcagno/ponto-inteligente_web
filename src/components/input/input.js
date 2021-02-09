import './styles.css';



function Input ({label, type, onChange,value, ...props}){
    return (
        <div className='input-wrap'>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} placeholder={props.placeholder} />
        </div>
        );
    
}
export default Input;