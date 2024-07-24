/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export const useDidMount = (cb: () => any = () => {}, dependency: any[] = []) => useEffect(() => cb(), dependency);
