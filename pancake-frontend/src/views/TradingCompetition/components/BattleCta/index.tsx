import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Flex,
  LaurelLeftIcon,
  LaurelRightIcon,
  Button,
  CheckmarkCircleIcon,
  useWalletModal,
  useModal,
} from 'pancakeswap-uikit'
import { useHistory } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { FINISHED, OVER } from 'config/constants/trading-competition/easterPhases'
import { toChecksumAddress } from 'ethereum-checksum-address'
import RegisterModal from '../RegisterModal'
import ClaimModal from '../ClaimModal'
import { Heading2Text } from '../CompetitionHeadingText'
import { CompetitionProps } from '../../types'
import { AnchorContext } from '../../../../contexts/AnchorContext'
import { createEthAccount, getEthAccountByTelosAccount } from '../../../../utils/eosioWallet'
import useToast from '../../../../hooks/useToast'

const StyledCard = styled(Card)`
  display: inline-flex;
  background: linear-gradient(180deg, #7645d9 0%, #452a7a 100%);

  svg {
    margin-bottom: 6px;
    height: 32px;
    width: auto;
    fill: ${({ theme }) => theme.colors.warning};
  }
`

const StyledButton = styled(Button)`
  margin: 16px 20px 0;
  z-index: 200;

  svg {
    margin: 0 4px 0 0;
    height: 20px;
    width: auto;
    fill: ${({ theme }) => theme.colors.textDisabled};
  }
`

const StyledHeadingText = styled(Heading2Text)`
  white-space: normal;
`

const BattleCta: React.FC<CompetitionProps> = ({
  userTradingInformation,
  currentPhase,
  account,
  isCompetitionLive,
  profile,
  userCanClaimPrizes,
  finishedAndPrizesClaimed,
  finishedAndNothingToClaim,
  isLoading,
  hasCompetitionEnded,
  onRegisterSuccess,
  onClaimSuccess,
}) => {
  const history = useHistory()
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { toastError, toastSuccess } = useToast()
  const { setAnchorSession } = useContext(AnchorContext)

  const handleConfirm = () => {
    setAnchorSession((session) => {
      if (!session) {
        toastError('Failed to establish an Anchor session.')
      } else {
        try {
          createEthAccount(session)
            .then(() => {
              getEthAccountByTelosAccount(session.auth.actor.toString()).then((ethAccount) => {
                window.localStorage.setItem('eth_account_by_telos_account', toChecksumAddress(ethAccount.address))
                toastSuccess('EVM account was created successfully!')
              })
            })
            .catch((error) => {
              console.error('Error when create eth account from Telos account', error)
              toastError('Something went wrong during the creation of the EVM account.')
            })
        } catch (error) {
          console.error('Error when create eth account from Telos account: ', error)
        }
      }
      return session
    })
  }

  const handleReject = () => {
    logout()
  }

  const { onPresentConnectModal } = useWalletModal(login, logout, handleConfirm, handleReject)
  const [onPresentRegisterModal] = useModal(
    <RegisterModal profile={profile} onRegisterSuccess={onRegisterSuccess} />,
    false,
  )
  const [onPresentClaimModal] = useModal(
    <ClaimModal userTradingInformation={userTradingInformation} onClaimSuccess={onClaimSuccess} />,
    false,
  )
  const { hasRegistered, hasUserClaimed } = userTradingInformation
  const registeredAndNotStarted = hasRegistered && !isCompetitionLive && !hasCompetitionEnded

  const isButtonDisabled = Boolean(
    isLoading ||
      currentPhase.state === OVER ||
      registeredAndNotStarted ||
      finishedAndPrizesClaimed ||
      finishedAndNothingToClaim,
  )

  const getHeadingText = () => {
    // Competition live
    if (isCompetitionLive) {
      return t('Now Live!')
    }
    // Competition finished. Rewards being calculated
    if (currentPhase.state === FINISHED) {
      return `${t('Calculating prizes')}...`
    }
    // All competition finished states
    if (hasCompetitionEnded) {
      return `${t('Finished')}!`
    }
    // Competition not started
    return t('Starting Soon')
  }

  const getButtonText = () => {
    // No wallet connected
    if (!account) {
      return t('Connect Wallet')
    }
    // User not registered
    if (!hasRegistered) {
      return t('I want to Battle!')
    }
    // User registered and competition live
    if (isCompetitionLive) {
      return t('Trade Now')
    }

    // User registered and competition finished
    if (hasCompetitionEnded) {
      // Claim period has ended
      if (currentPhase.state === OVER) {
        return t('Claim period over')
      }
      // User has prizes to claim
      if (userCanClaimPrizes) {
        return t('Claim prizes')
      }
      // User has already claimed prizes
      if (hasUserClaimed) {
        return (
          <>
            <CheckmarkCircleIcon /> {t('Prizes Claimed!')}
          </>
        )
      }
      // User has nothing to claim
      return t('Nothing to claim')
    }

    // User registered but competition has not started
    if (!isCompetitionLive) {
      return (
        <>
          <CheckmarkCircleIcon /> {t('Registered!')}
        </>
      )
    }

    // May be useful for debugging - if somehow none of the above conditions are met
    return 'Whoopsie'
  }

  const handleCtaClick = () => {
    // All conditions when button isn't disabled

    // No wallet connected
    if (!account) {
      onPresentConnectModal()
    }
    // Wallet connected but user not registered
    if (account && !hasRegistered) {
      onPresentRegisterModal()
    }
    // Registered and competition is live
    if (hasRegistered && isCompetitionLive) {
      history.push('/swap')
    }
    // Registered and competition has finished
    if (hasRegistered && hasCompetitionEnded) {
      onPresentClaimModal()
    }
  }

  return (
    <StyledCard>
      <CardBody>
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <StyledHeadingText>{getHeadingText()}</StyledHeadingText>
          {/* Hide button if in the pre-claim, FINISHED phase */}
          {currentPhase.state !== FINISHED && (
            <Flex alignItems="flex-end">
              <LaurelLeftIcon />
              <StyledButton disabled={isButtonDisabled} onClick={() => handleCtaClick()}>
                {getButtonText()}
              </StyledButton>
              <LaurelRightIcon />
            </Flex>
          )}
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default BattleCta
