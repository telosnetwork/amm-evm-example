import React from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import MoreHorizontal from "../../components/Svg/Icons/MoreHorizontal";
import { ButtonProps } from "../../components/Button";
import { connectorLocalStorageKey, walletLocalStorageKey } from "./config";
import { Login, Config, ConnectorNames } from "./types";
import {InjectedModalProps, Modal, ModalActions, useModal} from "../Modal";

interface Props {
  walletConfig: Config;
  login: Login;
  logout: () => void;
  onDismiss: () => void;
  handleConfirm?: () => void;
  handleReject?: () => void;
}

const WalletButton = styled(Button).attrs({ width: "100%", variant: "text", py: "16px" })`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

interface CreateEthAccountModalProps {
  title: string
  handleConfirm?: () => void
  handleReject?: () => void
  onDismiss: () => void
  logout: () => void
}

export const MoreWalletCard: React.FC<ButtonProps> = (props) => {
  return (
    <WalletButton variant="tertiary" {...props}>
       <MoreHorizontal width="40px" mb="8px" color="textSubtle" />
       <Text fontSize="14px">More</Text>
    </WalletButton>
  );
};

const CreateEthAccountConfirmationModal: React.FC<InjectedModalProps & CreateEthAccountModalProps> = ({
  title,
  handleConfirm,
  handleReject,
  onDismiss,
  logout,
}) => {
  
  const handleConfirmation = () => {
    if (handleConfirm) {
      handleConfirm()
    }
    onDismiss()
  }
  
  const handleRejection = () => {
    if (handleReject) {
      handleReject()
    }
    logout()
    onDismiss()
  }
  
  return (
    <Modal width="30%!important"  title={title} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      <Text fontSize="20px">You don&apos;t have EVM address for Telos account, do you want to create one?
        You will not be able to send transactions without an EVM address.
      </Text>

      <ModalActions>
        <Button variant="secondary"
          onClick={handleRejection}
          width="100%">
          No
        </Button>
        <Button
          width="100%"
          onClick={handleConfirmation}
        >
          Yes
        </Button>
      </ModalActions>
    </Modal>
  )
}

const WalletCard: React.FC<Props> = ({ login, logout, walletConfig, onDismiss, handleConfirm, handleReject}) => {
  const { title, icon: Icon } = walletConfig;
  
  const [onPresentCallback] = useModal(<CreateEthAccountConfirmationModal
      title="Create Eth account from Telos account"
      handleConfirm={handleConfirm}
      handleReject={handleReject}
      onDismiss={onDismiss}
      logout={logout}
    />,
    true,
    true,
    'createEthAccountModal'
  )

  return (
    <WalletButton
      variant="tertiary"
      onClick={() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Since iOS does not support Trust Wallet we fall back to WalletConnect
        if (walletConfig.title === "Trust Wallet" && isIOS) {
          login(ConnectorNames.WalletConnect);
        }
        else if (walletConfig.title === 'Anchor') {
          login(walletConfig.connectorId).then(() => {
            const a = localStorage.getItem('is_eth_account_exist')
            if (a === "false") {
              onPresentCallback()
            } else {
            }
          });
        }
        else {
          login(walletConfig.connectorId)
        }
        localStorage.setItem(walletLocalStorageKey, walletConfig.title);
        localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Icon width="40px" mb="8px" />
      <Text fontSize="14px">{title}</Text>
    </WalletButton>
  );
};

export default WalletCard;
