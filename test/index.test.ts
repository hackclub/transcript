import { TranscriptProvider } from '../dist/index';

test('can recite a line from transcript', () => {
	const transcript = new TranscriptProvider('./test/transcript.yml');

	expect(transcript.recite('greeting', {})).toBe('Hello, world!');
});

test('can recite a nested line from transcript', () => {
	const transcript = new TranscriptProvider('./test/transcript.yml');

	expect(transcript.recite('errors.notFound', {})).toBe("the dog sniffs around, but doesn't look like it found what it's looking for");
	expect(transcript.recite('errors.general', {})).toBe('something went wrong!');
});

test("can return the key when it doesn't exist", () => {
	const transcript = new TranscriptProvider('./test/transcript.yml');

	expect(transcript.recite('nonexistant', {})).toBe('nonexistant');
});

test('can use `recite` in string', () => {
	const transcript = new TranscriptProvider('./test/transcript.yml');

	expect(transcript.recite('welcome', {})).toBe('oh hello! i have tea and a fresh cherry pie cooling off... please come over and have some!');
});

test('can use variables passed', () => {
	const transcript = new TranscriptProvider('./test/transcript.yml');

	expect(transcript.recite('name', { name: 'orpheus' })).toBe('nice to meet you, orpheus!');
});

test('can recite a random line from transcript', () => {
	const possibles = ['cinnamon', 'butterscotch', 'cinnamon and butterscotch', 'snail'];
	const transcript = new TranscriptProvider('./test/transcript.yml');

	const first = transcript.recite('type-of-pie', {});
	const second = transcript.recite('type-of-pie', {});
	expect(possibles.includes(first)).toBe(true);
	expect(possibles.includes(second)).toBe(true);
});
