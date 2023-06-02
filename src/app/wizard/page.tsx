"use client"

import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import './styles.scss';

const wizardData = [
  {
    id: 'step-1',
    title: 'Hi There',
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

export default function OnboardingWizard() {
  const [selectedOptions, setSelectedOptions] = useState<{ stepID: string, optionID: string }[]>([]);
  const [currentStepID, setCurrentStepID] = useState(wizardData[0].id);

  const currentStep = useMemo(() => {
    return wizardData.find(step => step.id === currentStepID)
  }, [currentStepID]);

  const currentSelection = useMemo(() => {
    return selectedOptions.find(option => option.stepID === currentStepID)
  }, [currentStepID, selectedOptions]);

  const updateSelectedOptions = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const optionID = e.target.value;
    setSelectedOptions((options) => {
      let option = options.find(o => o.stepID === currentStepID);
      if (!option) option = { stepID: currentStepID, optionID: '' };
      const otherOptions = options.filter(o => o.stepID !== currentStepID);
      return [...otherOptions, { ...option, optionID }];
    })
  }, [currentStepID]);

  const moveToNextStep = useCallback(() => {
    let nextStepIndex = Math.min(wizardData.findIndex(step => step.id === currentStepID) + 1, wizardData.length - 1);
    setCurrentStepID(wizardData[nextStepIndex].id);
  }, [currentStepID]);

  const moveToPreviousStep = useCallback(() => {
    let nextStepIndex = Math.max(wizardData.findIndex(step => step.id === currentStepID) - 1, 0);
    setCurrentStepID(wizardData[nextStepIndex].id);
  }, [currentStepID]);

  return (
    <div className='wizard'>
      {currentStep && (
        <div className="wizard-container">

          <div className="wizard-header">
            <div className="wizard-title">{currentStep.title}</div>
            <div className="wizard-caption">{currentStep.caption}</div>
          </div>

          <div
            className="wizard-progress"
            style={{ gridTemplateColumns: `repeat(${wizardData.length}, 1fr)` }}
          >
            {wizardData.map(step => (
              <div
                key={step.id}
                className={`w-step ${step.id === currentStepID ? 'active' : ''}`}
              />
            ))}
          </div>

          <form className="wizard-body">
            <fieldset id={currentStep.id}>
              {
                currentStep.options.map(option => (
                  <label
                    key={option.id}
                    className={`wizard-option ${currentSelection?.optionID === option.id ? 'selected' : ''}`}
                    htmlFor={option.id}
                  >
                    <span className="w-option-caption">{option.caption}</span>
                    <input
                      type="radio"
                      name={currentStep.id}
                      checked={option.id === currentSelection?.optionID}
                      onChange={updateSelectedOptions}
                      value={option.id}
                      id={option.id}
                    />
                  </label>
                ))
              }
            </fieldset>
          </form>

          <div className="wizard-btn-wrapper">
            <button className='wizard-btn prev' onClick={moveToPreviousStep}>
              <span className="w-btn-text">Previous</span>
            </button>

            <button className='wizard-btn next' onClick={moveToNextStep}>
              <span className="w-btn-text">Next</span>
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
