import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { PatternWithMenu } from '../pattern-with-menu.mjs'
import { DraftHeader, ns as headerNs } from './header.mjs'

export const ns = [...menuNs, ...headerNs]

export const DraftView = ({
  design,
  pattern,
  patternConfig,
  settings,
  setSettings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  setView,
  view,
}) => {
  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = (
        <ShowPattern>
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html }} />
        </ShowPattern>
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = <ShowPattern {...{ renderProps }} />
  }

  return (
    <PatternWithMenu
      {...{
        settings,
        ui,
        update,
        control: account.control,
        account,
        design,
        pattern: output,
        setSettings,
        Header: DraftHeader,
        menu: (
          <DraftMenu
            {...{
              design,
              pattern,
              patternConfig,
              setSettings,
              settings,
              ui,
              update,
              language,
              account,
              DynamicDocs,
              renderProps,
              view,
              setView,
              flags: pattern.setStores?.[0]?.plugins?.['plugin-annotations']?.flags,
            }}
          />
        ),
      }}
    />
  )
}
