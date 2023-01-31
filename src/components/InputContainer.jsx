export default function InputContainer({
  type,
  id,
  inputClassName,
  placeHolder,
  value,
  handleChange,
  errorText
}) {
  return (
    <div className='inputContainer'>
      <input
        type={type}
        id={id}
        className={inputClassName}
        placeholder={placeHolder}
        value={value}
        onChange={e => handleChange(e)}
      />
      <p className='inputErrorText' style={{ display: errorText ? 'block' : 'none' }}>{errorText}</p>
    </div>
  );
}