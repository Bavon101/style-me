import type { UserResource } from '@clerk/types';

export function buildWizardData(user: UserResource | null | undefined) {
  return [
    {
      id: 'step-1',
      title: `Hi ${user?.username ?? 'There'}`,
      caption: 'How do you want STYLE-ME to elevate your style?',
      options: [
        {
          id: 'option-1',
          caption: 'Show me my color palette and create my style guide'
        },
        {
          id: 'option-2',
          caption: 'Help me decide if an item of clothing suits me or not'
        },
        {
          id: 'option-3',
          caption: 'Create new and unique looks from brands I love to enhance my personal style'
        }
      ]
    },
    {
      id: 'step-2',
      title: 'Choose your Style',
      caption: 'How well do you know your style?',
      options: [
        {
          id: 'option-1',
          caption: 'I know what colors make me look fresh and match my skin'
        },
        {
          id: 'option-2',
          caption: "I'm not entirely sure, but I can't wait to find out!"
        },
        {
          id: 'option-3',
          caption: "I'm a professional stylist"
        }
      ]
    },
    {
      id: 'step-3',
      title: 'Whats the Occasion?',
      caption: 'What occasions do you want to get styled for?',
      options: [
        {
          id: 'option-1',
          caption: 'For work'
        },
        {
          id: 'option-2',
          caption: "For casual daily activities"
        },
        {
          id: 'option-3',
          caption: "For a coffee date"
        },
        {
          id: 'option-4',
          caption: "For special events"
        }
      ]
    },
    {
      id: 'step-4',
      title: 'Whats your Style',
      caption: 'Which brands do you want to see recommendations from?',
      options: [
        {
          id: 'option-1',
          caption: 'Fast fashion'
        },
        {
          id: 'option-2',
          caption: "Premium brands"
        },
        {
          id: 'option-3',
          caption: "Luxury labels"
        },
        {
          id: 'option-4',
          caption: "Anything goes"
        }
      ]
    }
  ]
}
