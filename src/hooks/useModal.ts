import { useContext } from 'react';

import { ModalsContext } from '../providers/ModalsProvider';

export const useModal = () => useContext(ModalsContext);
