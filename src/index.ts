import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

type TranscriptObj = Record<string, unknown>;
type VarObj = Record<string, string | number | boolean>;

const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * The library's core... thing, y'know. It reads your transcript and recites what you've told it with perfect* accuracy
 * *accuracy may depend on your transcript choices..
 */
export class TranscriptProvider {
	/**
	 * to be used in the far future...
	 */
	protected cache: Map<string, string> | undefined;

	/**
	 * stores the transcript file... for now...
	 */
	protected transcript: TranscriptObj | undefined;
	constructor(src: string) {
		this.transcript = load(readFileSync(join(process.cwd(), src), 'utf-8')) as TranscriptObj; // this needs to be cached
	}

	/**
	 * Grab a string from your transcript.yml
	 * @param key they key to search for
	 * @param vars any variables you want to pass to `eval`
	 * @returns the string you asked for, OR the key you used if it cannot be located
	 */

	public recite(key: string, vars?: VarObj) {
		const searchArr = key.split('.');
		const line = this.recurseKeys(searchArr, this.transcript ?? {});
		return line === null ? line : this.evalWithContext(line, vars ?? {}); //TODO: WE SHOULD **NOT** EVAL IF THE STRING IS NOT FOUND -cf
	}

	protected recurseKeys(searchArr: string[], transcriptObj: TranscriptObj, topRequest?: string): string | null {
		topRequest = topRequest || searchArr.join('.');
		const searchCursor = searchArr.shift();
		if (!searchCursor) throw `Couldn't parse cursor`;

		const targetObj = transcriptObj[searchCursor] as string | string[] | TranscriptObj | undefined;

		if (!targetObj) return null; //if not found, return the key

		if (searchArr.length > 0) {
			return this.recurseKeys(searchArr, targetObj as TranscriptObj, topRequest);
		} else {
			if (Array.isArray(targetObj)) {
				return sample(targetObj);
			} else {
				return targetObj as string;
			}
		}
	}

	/**
	 * spicy eval, pls don't use me
	 * @param target string to eval
	 * @param vars stuff to be placed in `this`
	 * @returns stuff. idk. cosmic horrors beyond my comprehension
	 */
	private evalWithContext(target: string, vars: VarObj = {}): string {
		const context = {
			...vars,
			t: this.recite.bind(this)
		};
		return function () {
			return eval('`' + target + '`');
		}.call(context);
	}
}
