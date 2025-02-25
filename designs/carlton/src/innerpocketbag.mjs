import { front } from './front.mjs'

function draftCarltonInnerPocketBag({
  units,
  sa,
  store,
  points,
  options,
  macro,
  Point,
  paths,
  Path,
  expand,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `carlton:cutInnerPocketBag`,
      replace: {
        w: units(store.get('innerPocketWidth') + 2 * sa),
        l: units(store.get('innerPocketWidth') * options.innerPocketDepth * 2 + 2 * sa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.bottomRight = new Point(
    store.get('innerPocketWidth'),
    store.get('innerPocketWidth') * options.innerPocketDepth * 2
  )
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)

  paths.seam = new Path()
    .move(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .close()
    .addClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.addCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.2)
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: 14,
    title: 'innerPocketBag',
  })

  // Grainline
  macro('grainline', {
    from: points.bottomLeft.shift(0, 10),
    to: points.topLeft.shift(0, 10),
  })

  // Dimensions
  macro('vd', {
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15,
  })

  return part
}

export const innerPocketBag = {
  name: 'carlton.innerPocketBag',
  after: front,
  options: {
    innerPocketDepth: { pct: 110, min: 75, max: 140, menu: 'pockets' },
  },
  draft: draftCarltonInnerPocketBag,
}
