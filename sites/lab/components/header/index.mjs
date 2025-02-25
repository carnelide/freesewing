// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import {
  DesignIcon,
  DocsIcon,
  MenuIcon,
  UserIcon,
  ThemeIcon,
  I18nIcon,
  MeasieIcon,
  PatternIcon,
  GitHubIcon,
  PlusIcon,
} from 'shared/components/icons.mjs'
import { HeaderWrapper } from 'shared/components/wrappers/header.mjs'
import { ModalThemePicker, ns as themeNs } from 'shared/components/modal/theme-picker.mjs'
import { ModalLocalePicker, ns as localeNs } from 'shared/components/modal/locale-picker.mjs'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'

import { NavButton, NavSpacer } from 'shared/components/header.mjs'

export const ns = ['header', 'sections', ...themeNs, ...localeNs]

const NavIcons = ({ setModal }) => {
  const { t } = useTranslation(['header'])
  const { spectrum } = useTheme()
  const iconSize = 'h-6 w-6 lg:h-12 lg:w-12'

  return (
    <>
      <NavButton
        onClick={() => setModal(<ModalMenu />)}
        label={t('header:menu')}
        color={spectrum[0]}
      >
        <MenuIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/designs" label={t('header:designs')} color={spectrum[1]}>
        <DesignIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/patterns"
        label={t('header:patterns')}
        color={spectrum[2]}
        extraClasses="hidden lg:flex"
      >
        <PatternIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/sets"
        label={t('header:sets')}
        color={spectrum[3]}
        extraClasses="hidden lg:flex"
      >
        <MeasieIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton
        href="/docs"
        label={t('header:docs')}
        color={spectrum[4]}
        extraClasses="hidden lg:flex"
      >
        <DocsIcon className={iconSize} />
      </NavButton>
      <NavButton href="/code" label={t('sections:code')} color={spectrum[5]}>
        <GitHubIcon className={iconSize} />
      </NavButton>
      <NavButton href="/account" label={t('header:account')} color={spectrum[6]}>
        <UserIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton
        onClick={() => setModal(<ModalThemePicker />)}
        label={t('header:theme')}
        color={spectrum[7]}
      >
        <ThemeIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setModal(<ModalLocalePicker />)}
        label={t('header:language')}
        color={spectrum[8]}
      >
        <I18nIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/new" label={t('header:new')} color={spectrum[9]}>
        <PlusIcon className={iconSize} />
      </NavButton>
    </>
  )
}

export const Header = ({ setSearch, show }) => {
  const { setModal } = useContext(ModalContext)

  return (
    <HeaderWrapper {...{ setSearch, show }}>
      <div className="m-auto md:px-8">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          {/* Non-mobile content */}
          <div className="hidden lg:flex lg:flex-row lg:justify-between items-center xl:justify-center w-full">
            <NavIcons setModal={setModal} setSearch={setSearch} />
          </div>

          {/* Mobile content */}
          <div className="flex lg:hidden flex-row items-center justify-between w-full">
            <NavIcons setModal={setModal} setSearch={setSearch} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}
