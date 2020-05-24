import { SeasonOneStage } from './02_season_one';
import { DeploymentParams, AddressBook, DeploymentStage, Manager } from '@imtbl/deployment-utils';

import { CoreStage } from './01_core';
import { ForwarderStage } from './00_forwarder';

const config = require('dotenv').config({ path: '../../.env' }).parsed;

export const params: DeploymentParams = {
  private_key: process.env.PRIVATE_KEY,
  environment: process.env.DEPLOYMENT_ENVIRONMENT,
  network_id: parseInt(process.env.DEPLOYMENT_NETWORK_ID),
  network_key: `${process.env.DEPLOYMENT_ENVIRONMENT}`,
  rpc_url: process.env.RPC_ENDPOINT
};


async function start() {
  const args = require('minimist')(process.argv.slice(2));

  let stages: DeploymentStage[] = [];

  if (args.all) {
    args.forwarder = true;
    args.core = true;
    args.seasonone = true;
  }

  if (args.forwarder) {
    stages.push(new ForwarderStage(config.PRIVATE_KEY, config.RPC_ENDPOINT));
  }

  if (args.core) {
    stages.push(
      new CoreStage(config.PRIVATE_KEY, config.RPC_ENDPOINT, config.DEPLOYMENT_NETWORK_ID),
    );
  }

  if (args.seasonone) {
    stages.push(
      new SeasonOneStage(config.PRIVATE_KEY, config.RPC_ENDPOINT, config.DEPLOYMENT_NETWORK_ID),
    );
  }

  const book = new AddressBook(
    './src/addresses/addresses.json', 
    config.DEPLOYMENT_ENVIRONMENT,
    config.DEPLOYMENT_NETWORK_ID
  );

  const newManager = new Manager(stages, book, params);

  try {
    await newManager.deploy();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

start();
