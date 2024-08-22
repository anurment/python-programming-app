import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare const FIRST_KEY_INDEX = 1;
export declare function transformArguments(key: RedisCommandArgument, start: number, stop: number): RedisCommandArguments;
export declare function transformReply(): RedisCommandArgument;
