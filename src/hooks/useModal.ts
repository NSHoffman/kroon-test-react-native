import { useContext } from 'react';

import { ModalsContext } from '@kroon-test/providers';

export const useModal = () => useContext(ModalsContext);
