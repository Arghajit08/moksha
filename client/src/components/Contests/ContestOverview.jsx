import { useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import Sheet from '../common/Sheet'
import { useWindowSize } from '../../hooks/useWindowSize'
import ContestTypeBadge from './ContestTypeBadge'
import SocialShare from '../SocialShare'
import { getMokshaContest } from '../../data/contests/moksha'

export default function TeamContestOverview() {
  const params = useParams()
  const location = useLocation()
  const contest = getMokshaContest(params.club, params.contest)

  const { width } = useWindowSize()

  const shareData = useMemo(
    () => ({
      url: location.pathname,
      title: `Moksha contest - ${contest.name}`,
      text:
        contest.description[0].p.length <= 100
          ? contest.description[0].p.length
          : `${contest.description[0].p.substr(0, 100)}...`, // trim to 100 characters
    }),
    [contest.name, contest.description, location.pathname]
  )

  return (
    <>
      <Sheet className='p-4 sm:p-6'>
        <article className='markdown'>
          <h1>{contest.name}</h1>

          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              {contest.type.map(type => (
                <ContestTypeBadge small={width !== null && width < 1024} key={type} type={type} />
              ))}
            </div>

            <SocialShare data={shareData}>
              <div className='group inline-flex items-center lg:gap-1'>
                <div className='w-6 h-6 text-amber-700 group-hover:text-amber-600 transition-colors'>
                  <Icon icon={shareIcon} className='block' color='inherit' width='100%' height='100%' aria-hidden />
                </div>
                <p className='sr-only lg:not-sr-only text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors'>
                  Share
                </p>
              </div>
            </SocialShare>
          </div>

          {contest.description.map((para, i) => (
            <Para key={i} para={para} />
          ))}
        </article>
      </Sheet>

      {contest.instructions && (
        <Sheet className='mt-4 sm:mt-6 p-4 sm:p-6'>
          <article className='markdown'>
            <h2>Instructions</h2>

            {contest.instructions.map((para, i) => (
              <Para key={i} para={para} />
            ))}
          </article>
        </Sheet>
      )}
    </>
  )
}

const Para = ({ para }) => {
  return (
    <>
      {para.heading && <h3>{para.heading}</h3>}
      {para.p && <p className={para.bold ? 'font-semibold' : ''}>{para.p}</p>}
      {para.ul && (
        <ul>
          {para.ul.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      )}
    </>
  )
}
