

export default function Button({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='bg-accents-400 hover:bg-[#b1b1ee] py-2 px-6 rounded-md shadow-accents-100 shadow-sm text-accents-100 font-semibold active:translate-y-1 transition-all duration-75'
    >
      {text}
    </button>
  )
}
