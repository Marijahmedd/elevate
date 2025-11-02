import { Separator } from '../ui/separator'
import { SidebarHeader } from '../ui/sidebar'

const Header = () => {
    return (
        <>
            <SidebarHeader>
                <h2 className="flex text-xl font-bold px-4 py-2">Elevate.</h2>
            </SidebarHeader>

            <Separator />
        </>)
}
export default Header