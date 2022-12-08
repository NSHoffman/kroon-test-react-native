import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

type ModalState = {
  isOpen: boolean;
  args: Record<string, unknown>;
};

type ModalsContextType = {
  getState: (key: string) => ModalState;
  open: (key: string, args: Record<string, unknown>) => void;
  close: (key: string) => void;
};

type ModalsProviderProps = {
  children: React.ReactNode;
};

export const ModalsContext = createContext<ModalsContextType>(
  {} as ModalsContextType,
);

export const ModalsProvider: React.FC<ModalsProviderProps> = ({
  children,
}) => {
  const [modalsRegistry, setModalsRegistry] = useState<
    Record<string, ModalState>
  >({});

  const open = useCallback(
    (key: string, args: Record<string, unknown> = {}) => {
      setModalsRegistry(prevModalsRegistry => ({
        ...prevModalsRegistry,
        [key]: {
          isOpen: true,
          args,
        },
      }));
    },
    [],
  );

  const close = useCallback((key: string) => {
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: false,
        args: prevModalsRegistry[key]?.args ?? {},
      },
    }));
  }, []);

  const getState = useCallback(
    (key: string) =>
      modalsRegistry[key] ?? {
        isOpen: false,
        args: {},
      },
    [modalsRegistry],
  );

  const contextValue = useMemo<ModalsContextType>(
    () => ({
      open,
      close,
      getState,
    }),
    [close, getState, open],
  );

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
    </ModalsContext.Provider>
  );
};
