import React from 'react'
import { Flex, Text, Button, Link } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CompositeImage, { CompositeImageProps } from '../CompositeImage'
import PurpleWordHeading from '../PurpleWordHeading'
import ConnectWalletButton from '../../../../components/ConnectWalletButton'

interface SalesSectionButton {
  to: string
  text: string
  external: boolean
}

export interface SalesSectionProps {
  headingText: string
  bodyText: string
  reverse: boolean
  primaryButton: SalesSectionButton
  secondaryButton?: SalesSectionButton
  images: CompositeImageProps
}

const SalesSection: React.FC<SalesSectionProps> = (props) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { toastError, toastSuccess } = useToast()

  const { headingText, bodyText, reverse, primaryButton, secondaryButton, images } = props

  const headingTranslatedText = t(headingText)
  const bodyTranslatedText = t(bodyText)
  const isIncludeTelosEVM = bodyTranslatedText === 'Blazing Fast Trades on TelosEVM'
  const isGetTlosButton = secondaryButton?.text === 'Get Testnet EVM TLOS'
  let secondaryButtonTo = secondaryButton?.to

  if (isGetTlosButton && account) {
    secondaryButtonTo += account
  }

  const handleSendTlos = () => {
    fetch(secondaryButtonTo)
      .then(() => {
        toastSuccess('Testnet EVM TLOS sent successfully!')
      })
      .catch(() => {
        toastError('Something went wrong. Please, try again.')
      })
  }

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection={['column-reverse', null, null, reverse ? 'row-reverse' : 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
      >
        <Flex
          flexDirection="column"
          flex="1"
          ml={[null, null, null, reverse && '64px']}
          mr={[null, null, null, !reverse && '64px']}
          alignSelf={['flex-start', null, null, 'center']}
        >
          <PurpleWordHeading text={headingTranslatedText} />
          {isIncludeTelosEVM ? (
            <Text color="textSubtle" mb="24px">
              Blazing Fast Trades on <b>TelosEVM</b>
            </Text>
          ) : (
            <Text color="textSubtle" mb="24px">
              {bodyTranslatedText}
            </Text>
          )}

          <Flex>
            <Link mr="16px" external={primaryButton.external} href={primaryButton.to}>
              <Button>
                <Text style={{ lineHeight: 1 }} color="card" bold fontSize="16px">
                  {t(primaryButton.text)}
                </Text>
              </Button>
            </Link>
            {secondaryButton !== null ? (
              isGetTlosButton && !account ? (
                <ConnectWalletButton width="270px" text="Connect Wallet to Get Testnet EVM TLOS" />
              ) : (
                <Button onClick={handleSendTlos}>
                  <Text style={{ lineHeight: 1 }} color="card" bold fontSize="16px">
                    {t(secondaryButton.text)}
                  </Text>
                </Button>
              )
            ) : null}
          </Flex>
        </Flex>
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
        >
          <CompositeImage {...images} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SalesSection
