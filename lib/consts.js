export const NAVIGATION_STEPS = {
  TOKEN_SETUP: {
    idx: 1,
    title: 'Token Setup',
    description: 'Select the futures for your own version of the DAY token',
    className: 'step_token-setup',
    iconClassName: 'step-icons_token-setup',
    propertyKeys: ['tokenName', 'symbol'],
    nextUrl: '/step-2',
  },
  TIMEMINT_SETUP: {
    idx: 2,
    title: 'Timemint Setup',
    description: 'Setup minting and halving rate your contract will apply',
    className: 'step_timemint-setup',
    iconClassName: 'step-icons_timemint-setup',
    propertyKeys: ['minMintingPower', 'maxMintingPower', 'halvingCycle', 'mintingPeriod'],
    nextUrl: '/step-3',
  },
  CONTRACT_SETUP: {
    idx: 3,
    title: 'Contract Setup',
    description: 'Choose the specifics of your smart contract',
    className: 'step_contract-setup',
    iconClassName: 'step-icons_contract-setup',
    propertyKeys: ['maxAddresses', 'startingId', 'totalMintingId',
      'teamLockPeriod', 'postDeploymentMaxIds', 'minimumBalance'],
    nextUrl: '/step-4',
  },
  PUBLISH: {
    idx: 4,
    title: 'Publish',
    description: 'Check your contract\'s data and proceed with the deployment',
    className: 'step_publish',
    iconClassName: 'step-icons_publish',
    propertyKeys: ['tokenName', 'symbol',
      'minMintingPower', 'maxMintingPower', 'halvingCycle', 'mintingPeriod',
      'maxAddresses', 'startingId', 'totalMintingId',
      'teamLockPeriod', 'postDeploymentMaxIds', 'minimumBalance'],
    nextUrl: '/step-5',
    prevUrl: '/step-3',
  },
  WATCH: {
    idx: 5,
    title: 'Watch Page',
    description: 'Watch your deployed contract details and also assign late TimeMints',
    className: 'step_watch',
    iconClassName: 'step-icons_watch',
    propertyKeys: [],
    prevUrl: '/step-4',
  },
};

export const PROPERTIES = [
  {
    name: 'tokenName',
    title: 'Token name',
    description: 'The NAME of your token, as shown on the block explorer',
    errorMessage: 'Please enter a valid token name',
    validator: value => typeof value === 'string' && value.length > 0 && value.length < 30,
  },
  {
    name: 'symbol',
    title: 'Symbol',
    description: 'The token TICKER, as shown on the block explorer',
    errorMessage: 'Please enter a valid symbol',
    validator: value => typeof value === 'string' && value.length > 0 && value.length < 30,
  },
  {
    name: 'minMintingPower',
    title: 'Minimum minting power',
    description: 'The lowest possible minting rate for TimeMints ( Percentage % )',
    errorMessage: 'Please enter a valid Minimum minting power',
    validator: value => new RegExp('^\\d+\\.?\\d*$').test(value) && value.length > 0 && value.length < 30,
  },
  {
    name: 'maxMintingPower',
    title: 'Max minting power',
    description: 'The highest possible minting rate for TimeMints ( Percentage % )',
    errorMessage: 'Please enter a valid Max minting power',
    validator: value => new RegExp('^\\d+\\.?\\d*$').test(value) && Number(value) > 0 && value.length > 0 && value.length < 30,
  },
  {
    name: 'halvingCycle',
    title: 'Halving cycle',
    description: 'The period in days between the halvings of the minting power',
    errorMessage: 'Please enter a valid Halving cycle',
    validator: value => new RegExp('^\\d+$').test(value) && Number(value) > 0 && value.length > 0 && value.length < 30,
  },
  {
    name: 'mintingPeriod',
    title: 'Minting period in sec',
    description: 'Number of Seconds for TimeMints to mint',
    errorMessage: 'Please enter a valid Minting period in sec',
    validator: value => new RegExp('^\\d+$').test(value) && Number(value) > 0 && value.length > 0 && value.length < 30,
  },
  {
    name: 'maxAddresses',
    title: 'Max addresses',
    description: 'The maximum possible number of TimeMints ( Team TimeMints + Investor TimeMints)',
    errorMessage: 'Please enter a valid Max addresses',
    validator: value => new RegExp('^\\d+$').test(value) && Number(value) > 1 && value.length > 0 && value.length < 30,
  },
  {
    name: 'startingId',
    title: 'Starting Id for Team\'s minting address',
    description: 'The ID of the first Team TimeMint (Only Team TimeMints)',
    errorMessage: 'Please enter a valid Starting Id',
    validator: value => new RegExp('^\\d+$').test(value) && value.length > 0 && value.length < 30,
  },
  {
    name: 'totalMintingId',
    title: 'Total team\'s minting Id',
    description: 'The total number of all Team TimeMints ( Only Team TimeMints )',
    errorMessage: 'Please enter a valid Total team\'s minting Id',
    validator: value => new RegExp('^\\d+$').test(value) && value.length > 0 && value.length < 30,
  },
  {
    name: 'teamLockPeriod',
    title: 'Team lock period in seconds',
    description: 'Number of Seconds required by Team TimeMints to wait before Minted Tokens can be withdrawn or Transfered ',
    errorMessage: 'Please enter a valid Team lock period',
    validator: value => new RegExp('^\\d+$').test(value) && value.length > 0 && value.length < 30,
  },
  {
    name: 'postDeploymentMaxIds',
    title: 'Post deployment max Ids',
    description: 'Total number of allowed Investor TimeMints',
    errorMessage: 'Please enter a valid Post deployment max Ids',
    validator: value => new RegExp('^\\d+$').test(value) && value.length > 0 && value.length < 30,
  },
  {
    name: 'minimumBalance',
    title: 'Minimum balance to transfer a minter',
    description: 'Minimum number of minted tokens that can be transferred by TimeMints ( WEI )',
    errorMessage: 'Please enter a valid Minimum balance',
    validator: value => new RegExp('^\\d+$').test(value) && Number(value) > 0 && value.length > 0 && value.length < 30,
  },
];

export const NETWORK_MESSAGES = {
  '1': 'You are connected to Mainnet',
  '2': 'You are connected to deprecated Mordern Testnet',
  '3': 'You are connected to the Ropsten Testnet',
  '4': 'You are connected to the Rinkeby Testnet',
  default: 'You are connected to an unknown network',
};

export const CONTRACT_LABELS = {
  address: 'Contract Address',
  tokenName: 'Token Name',
  symbol: 'Symbol',
  totalSupply: 'Total supply',
  decimal: 'Decimals',
  mintingPeriod: 'Minting Period (secs)',
  totalDays: 'Total Days',
  halvingCycle: 'Halving Cycle',
  dayTokenActivated: 'Tokens Activated',
  maxAddresses: 'Max Addresses',
  firstContributorId : 'First Contributor',
  firstPostIcoContributorId: 'First Post-ICO Contributor',
  firstTeamContributorId: 'First Team Contributor',
  minMintingPower: 'Min Minting Power',
  maxMintingPower: 'Max Minting Power',
  initialBlockTimestamp: 'Initial Block Timestamp',
  teamLockPeriodInSec: 'Team Lock Period',
  totalNormalContributorIds: 'Total Normal Contributors',
  totalNormalContributorIdsAllocated: 'Total Normal Contributors Allocated',
  totalTeamContributorIds: 'Total Team Contributors',
  totalTeamContributorIdsAllocated: 'Total Team Contributors Allocated',
  totalPostIcoContributorIds: 'Total Post-ICO Contributors',
  totalPostIcoContributorIdsAllocated : 'Total Post-ICO Contributors Allocated'
}