import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {

}

export default function NavigationBar({children}: Props) {
  return (
    <div className="w-full h-fit shadow-lg flex items-center justify-start py-2 space-x-4 px-4 text-lg">
      {children}
    </div>
  )
}