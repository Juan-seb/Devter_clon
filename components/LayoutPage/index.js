const LayoutPage = ({children}) => {
  return (
    <div className="grid place-items-center h-screen sm:py-2">
      <main className="flex flex-col w-full h-full relative rounded-md bg-slate-50 shadow-lg shadow-black max-w-md overflow-y-scroll">
        {children}
      </main>
    </div>
  )
}

export default LayoutPage