import { PublicKey } from "@solana/web3.js";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";

const STORAGE_PREFIX = "multisig-";
export interface PersistedAccount {
  name: string;
  pubkey: PublicKey;
}

interface ContextValue {
  accounts: PersistedAccount[];
  save: (name: string, pubkey: PublicKey) => void;
}

const AccountsContext = React.createContext<ContextValue>({
  accounts: [],
  save: () => {},
});

function save(
  name: string,
  pubkey: PublicKey,
  setAccounts: React.Dispatch<React.SetStateAction<PersistedAccount[]>>,
  accounts: PersistedAccount[]
) {
  if (accounts.hasOwnProperty(name)) {
    throw new Error("name taken");
  }

  const storageKey = STORAGE_PREFIX + name;

  localStorage.setItem(storageKey, pubkey.toString());
  const newAccounts: PersistedAccount[] = [...accounts, { name, pubkey }];
  setAccounts(newAccounts);
}

const AccountsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accounts, setAccounts] = useState<PersistedAccount[]>([]);

  useEffect(() => {
    // initialize the accounts from localStorage
    const storageKeys = Object.keys(localStorage).filter((key) =>
      key.includes(STORAGE_PREFIX)
    );

    const newAccounts: PersistedAccount[] = [];

    storageKeys.forEach((key) => {
      const value = localStorage.getItem(key);

      if (value) {
        const name = key.split(STORAGE_PREFIX)[1];
        newAccounts.push({
          name,
          pubkey: new PublicKey(value),
        });
      }
    });

    setAccounts(newAccounts);
  }, []);

  const value = {
    accounts,
    save: (name: string, pubkey: PublicKey) =>
      save(name, pubkey, setAccounts, accounts),
  };
  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};

function usePersistedAccounts() {
  const context = React.useContext(AccountsContext);
  if (!context) {
    throw new Error(
      "usePersistedAccounts must be used within a AccountsProvider"
    );
  }
  return context;
}

export { AccountsProvider, usePersistedAccounts };
