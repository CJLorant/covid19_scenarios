import React from 'react'
import i18next from 'i18next'

import { FormikErrors, FormikTouched, FormikValues } from 'formik'

import { useTranslation } from 'react-i18next'

import type { CaseCountsDatum } from '../../../algorithms/types/Param.types'

import { ageDistributionNames } from '../state/getAgeDistribution'

import { CUSTOM_COUNTRY_NAME } from '../state/state'

import { CardWithControls } from '../../Form/CardWithControls'
import { FormDatePicker } from '../../Form/FormDatePicker'
import { FormDropdown } from '../../Form/FormDropdown'
import { FormSpinBox } from '../../Form/FormSpinBox'
import { ConfirmedCasesDataPicker } from './ConfirmedCasesDataPicker'

const countryOptions = ageDistributionNames.map((country) => ({ value: country, label: country }))
countryOptions.push({ value: CUSTOM_COUNTRY_NAME, label: i18next.t(CUSTOM_COUNTRY_NAME) })

export interface ScenarioCardPopulationProps {
  setCaseCounts(caseCounts: CaseCountsDatum[]): void
  errors?: FormikErrors<FormikValues>
  touched?: FormikTouched<FormikValues>
}

function ScenarioCardPopulation({ setCaseCounts, errors, touched }: ScenarioCardPopulationProps) {
  const { t } = useTranslation()

  return (
    <CardWithControls
      className="card-population h-100"
      identifier="populationScenario"
      labelComponent={<h3 className="p-0 m-0 d-inline text-truncate">{t('Population')}</h3>}
      help={t('Parameters of the population served by the healthcare system.')}
    >
      <FormSpinBox
        identifier="population.populationServed"
        label={t('Population')}
        help={t('Number of people served by the healthcare system.')}
        step={1}
        min={0}
        errors={errors}
        touched={touched}
      />
      <FormDropdown<string>
        identifier="population.ageDistributionName"
        label={t('Age distribution')}
        help={t('Country to determine the age distribution in the population')}
        options={countryOptions}
        errors={errors}
        touched={touched}
      />
      <FormSpinBox
        identifier="population.initialNumberOfCases"
        label={t('Initial number of cases')}
        help={t('Number of cases present at the start of simulation')}
        step={1}
        min={0}
        errors={errors}
        touched={touched}
      />
      <FormSpinBox
        identifier="population.importsPerDay"
        label={t('Imports per day')}
        help={t('Number of cases imported from the outside per day on average')}
        step={0.1}
        min={0}
        errors={errors}
        touched={touched}
      />
      <FormSpinBox
        identifier="population.hospitalBeds"
        label={`${t('Hospital Beds')} (${t('est.')})`}
        help={t(
          'Number of hospital beds available. The default values are rough estimates indicating total capacity. Number of beds available for COVID-19 treatment is likely much lower.',
        )}
        step={1}
        min={0}
        errors={errors}
        touched={touched}
      />
      <FormSpinBox
        identifier="population.icuBeds"
        label={`${t('ICU/ICMU')} (${t('est.')})`}
        help={t(
          'Number of available beds in Intensive Care Units (ICUs). The default values are rough estimates indicating total capacity. Number of ICU/ICMUs available for COVID-19 treatment is likely much lower.',
        )}
        step={1}
        min={0}
        errors={errors}
        touched={touched}
      />
      <ConfirmedCasesDataPicker errors={errors} touched={touched} setCaseCounts={setCaseCounts} />
      <FormDatePicker
        identifier="simulation.simulationTimeRange"
        label={t('Simulation time range')}
        help={t(
          'Start and end date of the simulation. Changing the time range might affect the result due to resampling of the mitigation curve.',
        )}
      />
      <FormSpinBox
        identifier="simulation.numberStochasticRuns"
        label={t('Number of runs')}
        help={t(
          'Perform multiple runs, to account for the uncertainty of parameters. More runs result in more accurate simulation, but take more time to finish.',
        )}
        step={1}
        min={10}
        errors={errors}
        touched={touched}
      />
    </CardWithControls>
  )
}

export { ScenarioCardPopulation }
