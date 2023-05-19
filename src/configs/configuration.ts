import type { Config, Default, Objectype } from './config.interface';

export const configuration = async (): Promise<Config> => {
  const { config } = <{ config: Default }>(
    await import(`${__dirname}/envs/default`)
  );

  return config;
};
