from dotenv import load_dotenv
import json
import math
import time
import os
from web3 import Web3
from datetime import datetime


load_dotenv()


HTTP_ENDPOINT = "http://testrpc.us.telos.net:7000/evm"
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ALLOWED_SLIPPAGE = 0.05  # 5 %

# ----------------------------------------------------------------------------------------------
# Contract and token addresses
# ----------------------------------------------------------------------------------------------

ROUTER_ADDRESS = "0x67A5D237530c9e09A7b3FdF52071179F4621Bb3D"
WTLOS_ADDRESS = "0x5bf0E1Fa3B7988660E8d22860743BB289196f0ac"
BENCH_ADDRESS = "0x8a247460a15661ff1F5615035f41653222189D9D"

# Some test tokens
SOON_ADDRESS = "0x3E50798E86D1046Eb9d1c7fe86566128e25e5631"
LOL_ADDRESS = "0xFEA334eF431f683Ce6921713b293416d0677aFF4"
FIAT_ADDRESS = "0xf67199482FabD2E6A961d0b370560D2624b7F80F"


w3 = Web3(Web3.HTTPProvider(HTTP_ENDPOINT))


def get_transaction_deadline():
    return math.floor(time.time()) + 10000  # + 10000 sek


def get_account():
    return w3.eth.account.privateKeyToAccount(PRIVATE_KEY)


def get_router_contract():
    with open("./abi/router.json") as f:
        return w3.eth.contract(
            address=ROUTER_ADDRESS,
            abi=json.load(f)
        )


def get_erc20_contract(token_address):
    with open("./abi/erc20.json") as f:
        return w3.eth.contract(
            address=token_address,
            abi=json.load(f)
        )


def get_minimum_amount_out(amount):
    return math.floor(amount - (amount * ALLOWED_SLIPPAGE))


def get_maximum_amount_in(amount):
    return math.floor(amount + (amount * ALLOWED_SLIPPAGE))


def build_and_send_transaction(contract, function_name, value=0, params=None):
    if not params:
        params = []
    account = get_account()
    tx = getattr(contract.functions, function_name)(*params).buildTransaction({
        'from': account.address,
        'nonce': w3.eth.getTransactionCount(account.address),
        'gas': 100000000,
        'gasPrice': w3.toWei(w3.eth.gas_price, 'gwei'),
        "value": value
    })
    signed_tx = account.signTransaction(tx)
    try:
        tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
        tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
        print("Receipt: ", tx_receipt)
        print(
            "Contract: ", contract.address,
            "Function: ", function_name,
            "params: ", params,
            "Result: ", tx_receipt
        )
    except ValueError as exc:
        print('Exc: ', exc)


def approve_token_for_router(
    token_address,
    amount=2 ** 256 - 1  # max uint256
):
    """ approve(address spender, uint256 amount) """
    contract = get_erc20_contract(token_address)
    build_and_send_transaction(
        contract,
        "approve",
        params=[ROUTER_ADDRESS, amount]
    )


def approve_all_tokens_for_router():
    for token in [LOL_ADDRESS, FIAT_ADDRESS, BENCH_ADDRESS, WTLOS_ADDRESS, SOON_ADDRESS]:
        approve_token_for_router(token)


def add_liquidity(
    token_address_a,
    token_address_b,
    amount_a_desired,
    amount_b_desired,
):
    """
    addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "addLiquidity",
        params=[
            token_address_a,
            token_address_b,
            amount_a_desired,
            amount_b_desired,
            get_minimum_amount_out(amount_a_desired),
            get_minimum_amount_out(amount_b_desired),
            get_account().address,
            get_transaction_deadline()
        ]
    )


def add_liquidity_eth(
    token_address,
    amount_token_desired,
    eth_value
):
    """
    addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "addLiquidityETH",
        value=eth_value,
        params=[
            token_address,
            amount_token_desired,
            get_minimum_amount_out(amount_token_desired),
            get_minimum_amount_out(eth_value),
            get_account().address,
            get_transaction_deadline()
        ]
    )


# ----------------------------------------------------------------------------------------------
# Swap from exact token
# ----------------------------------------------------------------------------------------------

def swap_exact_eth_for_tokens(amount_in, amount_out, token_address):
    """
    swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "swapExactETHForTokens",
        value=amount_in,
        params=[
            get_minimum_amount_out(amount_out),
            [WTLOS_ADDRESS, token_address],
            get_account().address,
            get_transaction_deadline()
        ]
    )


def swap_exact_tokens_for_eth(amount_in, amount_out, token_address):
    """
    swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "swapExactTokensForETH",
        value=0,
        params=[
            math.floor(amount_in),
            get_minimum_amount_out(amount_out),
            [token_address, WTLOS_ADDRESS],
            get_account().address,
            get_transaction_deadline()
        ]
    )


def swap_exact_tokens_for_tokens(amount_in, amount_out, from_token, to_token):
    """
    swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "swapExactTokensForTokens",
        value=0,
        params=[
            math.floor(amount_in),
            get_minimum_amount_out(amount_out),
            [from_token, to_token],
            get_account().address,
            get_transaction_deadline()
        ]
    )


# ----------------------------------------------------------------------------------------------
# Swap to exact token
# ----------------------------------------------------------------------------------------------

def swap_eth_for_exact_tokens(amount_out, amount_in, token_address):
    """
    swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "swapETHForExactTokens",
        value=get_maximum_amount_in(amount_in),
        params=[
            math.floor(amount_out),
            [WTLOS_ADDRESS, token_address],
            get_account().address,
            get_transaction_deadline()
        ]
    )


def swap_tokens_for_exact_eth(amount_out, amount_in, token_address):
    """
    swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "swapTokensForExactETH",
        value=0,
        params=[
            math.floor(amount_out),
            get_maximum_amount_in(amount_in),
            [token_address, WTLOS_ADDRESS],
            get_account().address,
            get_transaction_deadline()
        ]
    )


def swap_tokens_for_exact_tokens(amount_out, amount_in, to_token, from_token):
    """
    swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
    """
    contract = get_router_contract()
    build_and_send_transaction(
        contract,
        "swapTokensForExactTokens",
        value=0,
        params=[
            math.floor(amount_out),
            get_maximum_amount_in(amount_in),
            [from_token, to_token],
            get_account().address,
            get_transaction_deadline()
        ]
    )


def main():
    approve_all_tokens_for_router()
    add_liquidity_eth(FIAT_ADDRESS, 200000 * 10**18, 2 * 10**18)
    time_before_swaps = datetime.now()
    for i in range(10):
        swap_exact_tokens_for_eth(0.1 * 10**18, 1 * 10**12, FIAT_ADDRESS)
    print('Elapsed time', datetime.now() - time_before_swaps)


main()
