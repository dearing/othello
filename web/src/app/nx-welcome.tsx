import {state} from '@othello/state';

const greeting = state();
export function NxWelcome({ title }: { title: string }) {
  return (
    <div>{greeting}</div>
      );
}

export default NxWelcome;
