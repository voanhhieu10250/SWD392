import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HomeIcon from '@mui/icons-material/Home'
import PaletteIcon from '@mui/icons-material/Palette'
import { NavLink } from 'react-router-dom'
import { cn } from '~/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const SideNav = () => {
  return (
    <div className='flex flex-col bg-background border-r border-background h-screen pt-[72px]'>
      <NavItem href='/' tooltip='Arts'>
        <HomeIcon />
      </NavItem>

      <NavItem href='/top-creators' tooltip='Top creators'>
        <EmojiEventsIcon />
      </NavItem>

      <NavItem href='/packages' tooltip='Packages'>
        <PaletteIcon />
      </NavItem>
    </div>
  )
}

export default SideNav

type NavItemProps = {
  href: string
  children: React.ReactNode
  tooltip?: string
}

const NavItem = ({ href, children, tooltip }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <NavLink
            to={href}
            className={({ isActive }) =>
              cn('py-3 flex items-center justify-center', isActive ? 'bg-secondary' : 'hover:bg-link-hover')
            }
          >
            {children}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
