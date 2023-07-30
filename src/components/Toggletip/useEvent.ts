
/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * @template {keyof GlobalEventHandlersEventMap} E
 * @typedef {(event: GlobalEventHandlersEventMap[E]) => void} GlobalEventCallback
 */

/**
 * @template T
 * @typedef {import('react').MutableRefObject<T>} MutableRefObject<T>
 */

/**
 * @template {keyof GlobalEventHandlersEventMap} E
 * @param {HTMLElement | MutableRefObject<HTMLElement | null>} elementOrRef
 * @param {E} eventName
 * @param {GlobalEventCallback<E>} callback
 */
export function useEvent(elementOrRef: any, eventName: string, callback: any) {
  /**
   * @type {MutableRefObject<GlobalEventCallback<E> | null>}
   */
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    /**
     * @type {GlobalEventCallback<E>}
     */
    const handler = (event: any) => {
      if (savedCallback.current) {
        (savedCallback as any).current(event);
      }
    };

    const element =
      'current' in elementOrRef ? elementOrRef.current : elementOrRef;
    element?.addEventListener?.(eventName, handler);

    return () => {
      element?.removeEventListener?.(eventName, handler);
    };
  }, [elementOrRef, eventName]);
}

/**
 * @template {keyof WindowEventMap} E
 * @typedef {(event: WindowEventMap[E]) => void} WindowEventCallback
 */

/**
 * @template {keyof WindowEventMap} E
 * @param {E} eventName
 * @param {WindowEventCallback<E>} callback
 */
export function useWindowEvent(eventName: string, callback: any) {
  /**
   * @type {MutableRefObject<WindowEventCallback<E> | null>}
   */
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    /**
     * @type {WindowEventCallback<E>}
     */
    function handler(event: any) {
      if (savedCallback.current) {
        (savedCallback as any).current(event);
      }
    }

    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName]);
}