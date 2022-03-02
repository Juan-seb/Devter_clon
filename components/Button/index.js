const Button = ({ children, onClick, disabled }) => {

    return (
        <button onClick={onClick} disabled={disabled} className="transition w-full h-10 mx-auto rounded-lg text-center text-base
            text-yellow-100 bg-gray-800 hover:text-red-400 disabled:opacity-50">
            {children}
        </button>
    )
}

export default Button