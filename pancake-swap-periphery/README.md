# Pancake Router

### Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn install`

## Compile Contracts

`yarn compile`

## Deploy contracts
Before deploying contracts, create an **.env** file as shown in the **.env.example**.
You need to specify the **Factory** address which will be known after you deploy 
the **Factory** contract from the **Core** folder. 
Also in the file **libraries/PancakeLibrary.sol** on line **23** you must insert your
**Init code hash**, which is taken from the **Factory** contract (parameter **INIT_CODE_PAIR_HASH**).
Then, run command:  

`yarn migrate`
