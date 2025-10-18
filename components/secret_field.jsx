

export default function SecretField({fieldName, id, name = id, outline}) {
    const className = `bg-accent text-lg w-full rounded-md outline-${outline} outline focus:outline-none`
    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type="password" id={id} name={name} required minLength="8" maxLength="20" className={className}></input></label><br/>
        </div>
    )
}