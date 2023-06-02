'use client';

import { RedirectToSignIn } from "@clerk/clerk-react";
import { useUser } from '@clerk/nextjs';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import LoaderSVG from '../assets/images/loader.svg';
import './styles.scss';
import { buildWizardData } from './utils';


export default function OnboardingWizard() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const wizardData = buildWizardData(user);

  const [selectedOptions, setSelectedOptions] = useState<{ stepID: string, optionID: string }[]>([]);
  const [currentStepID, setCurrentStepID] = useState(wizardData[0].id);

  const currentStep = useMemo(() => {
    return wizardData.find(step => step.id === currentStepID)
  }, [currentStepID, wizardData]);

  const currentSelection = useMemo(() => {
    return selectedOptions.find((option) => option.stepID === currentStepID);
  }, [currentStepID, selectedOptions]);

  const updateSelectedOptions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const optionID = e.target.value;
      setSelectedOptions((options) => {
        let option = options.find((o) => o.stepID === currentStepID);
        if (!option) option = { stepID: currentStepID, optionID: '' };
        const otherOptions = options.filter((o) => o.stepID !== currentStepID);
        return [...otherOptions, { ...option, optionID }];
      });
    },
    [currentStepID]
  );

  const moveToNextStep = useCallback(() => {
    let nextStepIndex = Math.min(
      wizardData.findIndex((step) => step.id === currentStepID) + 1,
      wizardData.length
    );

    if (nextStepIndex === wizardData.length) {
      router.push('./image-upload');
    } else {
      setCurrentStepID(wizardData[nextStepIndex].id);
    }
  }, [currentStepID, router, wizardData]);

  const moveToPreviousStep = useCallback(() => {
    let nextStepIndex = Math.max(
      wizardData.findIndex((step) => step.id === currentStepID) - 1,
      0
    );
    setCurrentStepID(wizardData[nextStepIndex].id);
  }, [currentStepID, wizardData]);

  console.log(currentSelection);

  return (
    <div className='wizard'>

      {!isLoaded && (
        <div className="wizard-loader">
          <Image src={LoaderSVG} className='loader' alt='Loading spinner' />
        </div>
      )}

      {(isLoaded && !isSignedIn) && (
        <RedirectToSignIn />
      )}

      {(isSignedIn && currentStep) && (
        <div className="wizard-container">

          <div className="wizard-header">
            <div className="wizard-title">{currentStep.title}</div>
            <div className="wizard-caption">{currentStep.caption}</div>
          </div>

          <div
            className='wizard-progress'
            style={{ gridTemplateColumns: `repeat(${wizardData.length}, 1fr)` }}
          >
            {wizardData.map((step) => (
              <div
                key={step.id}
                className={`w-step ${step.id === currentStepID ? 'active' : ''
                  }`}
              />
            ))}
          </div>

          <form className='wizard-body'>
            <fieldset id={currentStep.id}>
              {currentStep.options.map((option) => (
                <label
                  key={option.id}
                  className={`wizard-option ${currentSelection?.optionID === option.id ? 'selected' : ''
                    }`}
                  htmlFor={option.id}
                >
                  <span className='w-option-caption'>{option.caption}</span>
                  <input
                    type='radio'
                    name={currentStep.id}
                    checked={option.id === currentSelection?.optionID}
                    onChange={updateSelectedOptions}
                    value={option.id}
                    id={option.id}
                  />
                </label>
              ))}
            </fieldset>
          </form>

          <div
            className={classNames(
              'wizard-btn-wrapper',
              currentStepID === wizardData[0].id ? 'flexEnd' : ''
            )}
          >
            {currentStepID !== wizardData[0].id && (
              <button className='wizard-btn prev' onClick={moveToPreviousStep}>
                <span className='w-btn-text'>Previous</span>
              </button>
            )}

            <button
              className={classNames(
                'wizard-btn next',
                !currentSelection ? 'disabled' : ''
              )}
              disabled={!currentSelection}
              onClick={moveToNextStep}
            >
              <span className='w-btn-text'>
                {currentStepID === wizardData[wizardData.length - 1].id
                  ? 'Finish'
                  : 'Next'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
