import { APP_TITLE } from '@/constants'

export const AppHeader = () => {
  return (
    <header className="h-[64px] bg-white fixed w-full top-0 z-20">
      <div className="flex gap-4 items-center h-full">
        <h1 className="font-semibold px-4 whitespace-pre-line text-sm md:text-lg">{APP_TITLE}</h1>
      </div>
    </header>
  )
}
