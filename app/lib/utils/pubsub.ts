import { useEffect } from 'react';
import { EventEmitter } from 'eventemitter3';

const emitter: EventEmitter = new EventEmitter();

const useSub = (event: string, callback: (event: CustomEventInit) => void) => {
  const unsubscribe = () => {
    emitter.off(event, callback);
  };

  useEffect(() => {
    emitter.on(event, callback);
    return unsubscribe;
  });

  return unsubscribe;
};

const usePub = () => {
  return (event: string, data: any) => {
    emitter.emit(event, data);
  };
};

const pubSub = {
  emit: usePub, on: useSub
}

export default pubSub
