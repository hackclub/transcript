import { TranscriptProvider } from '../dist/indexer';

test('can recite a line from transcript', () => {
	const transcript = new TranscriptProvider('./test/transcript.yml');

	expect(transcript.recite('greeting', {})).toBe('Hello, world!');
});

test('can recite a random line from transcript', () => {
	const possibles = ['cinnamon', 'butterscotch', 'cinnamon and butterscotch', 'snail'];
	const transcript = new TranscriptProvider('./test/transcript.yml');

	const first = transcript.recite('type-of-pie', {});
	const second = transcript.recite('type-of-pie', {});
	expect(possibles.includes(first)).toBe(true);
	expect(possibles.includes(second)).toBe(true);
	expect(first).not.toBe(second);
});
