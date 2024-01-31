export const Toolbar = () => {
  return (
    <div className="absolute left-2 top-[50%] flex -translate-y-[50%] flex-col gap-y-4">
      <div className="flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
        <div className="">pencil</div>
        <div className="">square</div>
        <div className="">circle</div>
        <div className="">ellipsis</div>
      </div>

      <div className="flex flex-col items-center rounded-md bg-white p-1.5 shadow-md">
        <div className="">undo</div>
        <div className="">redo</div>
      </div>
    </div>
  )
}
