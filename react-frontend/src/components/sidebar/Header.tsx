import { Separator } from '../ui/separator'
import { SidebarHeader } from '../ui/sidebar'

const Header = () => {
    return (
        <>
            <SidebarHeader>
                <div className='flex items-center'>
                    <div className="h-16 w-16 overflow-hidden">
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="h-full w-full object-cover scale-150"
                        />
                    </div>
                    <h2 className="flex text-xl font-bold px-1 py-2">Elevate.</h2>
                </div>
            </SidebarHeader>

            <Separator />
        </>)
}
export default Header