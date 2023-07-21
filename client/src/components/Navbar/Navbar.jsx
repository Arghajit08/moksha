import { memo, useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'
import { createSearchParams, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { classNames } from '@arpansaha13/utils'
import TzFloatingWindow from '@tranzis/react-layouts/TzFloatingWindow'
import { Icon } from '@iconify/react'
import menuIcon from '@iconify-icons/mdi/menu'
import closeIcon from '@iconify-icons/mdi/close'
import NavbarDropdown from './NavbarDropdown'
import { useAppContext } from '~/containers/DataProvider'
import { useFetch } from '~/hooks/useFetch'
import { navTabs } from '~/data/tabs'

const NavTab = memo(({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      classNames(
        'block w-max font-semibold text-xl p-1.5 uppercase transition-colors',
        isActive ? 'text-amber-600' : 'hover:text-amber-500'
      )
    }
  >
    {children}
  </NavLink>
))

function Navbar() {
  const { appContext, resetAppContext } = useAppContext()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const location = useLocation()
  const navigate = useNavigate()
  const fetchHook = useFetch()

  const logOut = useCallback(() => {
    fetchHook('auth/logout')
    resetAppContext()

    if (locationNeedsAuth(location.pathname)) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHook, location.pathname])

  return (
    <header className='relative z-40'>
      <nav className='px-4 sm:px-20 h-[100px] w-full flex items-center justify-between text-ochre'>
        {isTabletOrMobile ? (
          // Mobile Navbar
          <TzFloatingWindow.Button className='block p-1 w-10 h-10 focus:text-amber-600 border border-ochre rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-amber-200 focus:ring-amber-600 transition-colors relative'>
            {({ float }) => (
              <Icon icon={float ? closeIcon : menuIcon} className='block' color='inherit' width='100%' height='100%' />
            )}
          </TzFloatingWindow.Button>
        ) : (
          // Desktop Navbar
          <div className='flex items-center'>
            <div className='sm:mr-8 w-12 h-12'>
              <img src='/moksha-logo.svg' alt='Moksha logo' className='w-full h-full' />
            </div>
            <ul className='flex gap-3 sm:gap-6'>
              {navTabs.map(tab => (
                <li key={tab.to}>
                  <NavTab to={tab.to}>{tab.name}</NavTab>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common for both Mobile and Desktop */}
        {appContext.authenticated ? (
          <NavbarDropdown avatarIdx={appContext.avatar_idx} onLogOut={logOut} />
        ) : (
          <div className='flex gap-3 sm:gap-6'>
            <NavTab to={{ pathname: '/auth/login', search: `${createSearchParams({ from: location.pathname })}` }}>
              Login
            </NavTab>

            <NavTab to={{ pathname: '/auth/register', search: `${createSearchParams({ from: location.pathname })}` }}>
              Sign up
            </NavTab>
          </div>
        )}
      </nav>
    </header>
  )
}
export default Navbar

function locationNeedsAuth(path) {
  if (path.startsWith('/account/')) return true
  if (path.startsWith('/teams/')) return true

  // TODO: Add contests registration panel

  return false
}
