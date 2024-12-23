import { config } from "./wagmiConfig";

export function isChainIdSupported(id?: number) {
  return config.chains.find((c) => c.id === id) !== undefined;
}