import type { Contest } from '../types'

const nlc: Contest[] = [
  {
    id: 2,
    slug: 'quiz-competition',
    name: 'Quiz Competition',
    club: 'nlc',
    subtitle: 'NLC',
    type: ['duo'],
    allowedTeamSize: 2,
    image: {
      sources: [
        { srcSet: '/images/contests/nlc/quiz-competition/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/contests/nlc/quiz-competition/poster-512x512.png', type: 'image/png' },
        { srcSet: '/images/contests/nlc/quiz-competition/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/contests/nlc/quiz-competition/poster-1024x1024.png 2x', type: 'image/png' },
      ],
      src: '/images/contests/nlc/quiz-competition/poster-512x512.png',
    },
    description: [
      {
        p: 'Get ready to test your knowledge, quick thinking, and teamwork! This thrilling quiz competition, organized for NITA students, is set to take center stage during the grand release event of Udaan.',
      },
      {
        ul: [
          'Theme: Comic',
          'Venue: Visvesvaraya Auditorium, NIT Agartala',
          'Date: 27th Sept - 1st Oct',
          'Time: To be announced',
        ],
      },
      {
        link: {
          text: 'Click here to register',
          to: 'https://forms.gle/YifUZKbdUuTrCiy56',
        },
      },
    ],
  },
]

const udaanContests = Object.freeze([...nlc])

export default udaanContests
