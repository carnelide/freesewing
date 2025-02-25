import { draftBarrelCuff, decorateBarrelCuff, paperlessBarrelCuff } from './shared.mjs'

export const draftRoundedBarrelCuff = ({ store, sa, points, Path, paths, macro, part }) => {
  draftBarrelCuff(part)
  const height = store.get('cuffHeight')
  macro('round', {
    from: points.topRight,
    to: points.bottomLeft,
    via: points.topLeft,
    radius: height / 3,
    prefix: 'topLeftRound',
  })
  macro('round', {
    from: points.bottomRight,
    to: points.topLeft,
    via: points.topRight,
    radius: height / 3,
    prefix: 'topRightRound',
  })
  points.leftAngleBottom = points.topLeft.shift(-90, height / 3)
  points.rightAngleTop = points.topRight.shift(180, height / 3)
  points.rightAngleBottom = points.topRight.shift(-90, height / 3)
  paths.seam = new Path()
    .move(points.topLeftRoundEnd)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRightRoundStart)
    .curve(points.topRightRoundCp1, points.topRightRoundCp2, points.topRightRoundEnd)
    .line(points.topLeftRoundStart)
    .curve(points.topLeftRoundCp1, points.topLeftRoundCp2, points.topLeftRoundEnd)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 4, from: 'fabric' })

  decorateBarrelCuff(part)
  paperlessBarrelCuff(part)
  macro('vd', {
    id: 'hRound',
    from: points.topRightRoundStart,
    to: points.topRightRoundEnd,
    x: points.topRightRoundStart.x + 15 + sa,
  })

  return part
}
