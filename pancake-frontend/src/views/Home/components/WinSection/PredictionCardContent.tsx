import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Text, Skeleton, Link, Button, ArrowForwardIcon, Heading } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import useRefresh from 'hooks/useRefresh'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { getTotalWon } from 'state/predictions/helpers'
import { usePriceTlosBusd } from 'state/farms/hooks'

const StyledLink = styled(Link)`
  width: 100%;
`

const PredictionCardContent = () => {
  const { t } = useTranslation()
  const { slowRefresh } = useRefresh()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const tlosBusdPrice = usePriceTlosBusd()
  const [tlosWon, setTlosWon] = useState(0)
  const [tlosWonInUsd, setTlosWonInUsd] = useState(0)

  const localisedTlosUsdString = formatLocalisedCompactNumber(tlosWonInUsd)
  const tlosWonText = t('$%tlosWonInUsd% in TLOS won so far', { tlosWonInUsd: localisedTlosUsdString })
  const [pretext, wonSoFar] = tlosWonText.split(localisedTlosUsdString)

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  useEffect(() => {
    const fetchMarketData = async () => {
      const totalWon = await getTotalWon()
      setTlosWon(totalWon)
    }

    if (loadData) {
      fetchMarketData()
    }
  }, [slowRefresh, loadData])

  useEffect(() => {
    if (tlosBusdPrice.gt(0) && tlosWon > 0) {
      setTlosWonInUsd(tlosBusdPrice.times(tlosWon).toNumber())
    }
  }, [tlosBusdPrice, tlosWon])

  return (
    <>
      <Flex flexDirection="column" mt="48px">
        <div ref={observerRef} />
        <Text color="#280D5F" bold fontSize="16px">
          {t('Prediction')}
        </Text>
        {tlosWonInUsd ? (
          <Heading color="#280D5F" my="8px" scale="xl" bold>
            {pretext}
            {localisedTlosUsdString}
          </Heading>
        ) : (
          <>
            <Skeleton width={230} height={40} my="8px" />
            <div ref={observerRef} />
          </>
        )}
        <Text color="#280D5F" mb="24px" bold fontSize="16px">
          {wonSoFar}
        </Text>
        <Text color="#280D5F" mb="40px">
          {t('Will TLOS price rise or fall? guess correctly to win!')}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <StyledLink href="/prediction" id="homepage-prediction-cta">
          <Button width="100%">
            <Text bold color="invertedContrast">
              {t('Play')}
            </Text>
            <ArrowForwardIcon ml="4px" color="invertedContrast" />
          </Button>
        </StyledLink>
      </Flex>
    </>
  )
}

export default PredictionCardContent
