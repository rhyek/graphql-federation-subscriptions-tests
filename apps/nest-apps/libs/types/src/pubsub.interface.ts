export abstract class PubSub {
  abstract asyncIterator(event: string): AsyncIterator<any>;
  abstract publish(event: string, payload: any): void;
}
